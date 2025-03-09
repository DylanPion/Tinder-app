package com.example.JwtToken.service;

import java.time.LocalDateTime;
import java.util.Optional;

import com.example.JwtToken.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.example.JwtToken.entities.Match;
import com.example.JwtToken.entities.Swipe;
import com.example.JwtToken.entities.User;
import com.example.JwtToken.repositories.MatchRepository;
import com.example.JwtToken.repositories.SwipeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SwipeService {

    private final SwipeRepository swipeRepository;
    private final UserRepository userRepository;
    private final MatchRepository matchRepository;

    /**
     * Records a swipe and creates a match if necessary
     * 
     * @param swiperId ID of the user who swipes
     * @param swipedId ID of the user who is swiped
     * @return true if a match is created, false otherwise
     */
    @Transactional
    public boolean likeUser(Long swiperId, Long swipedId) {
        User swiper = userRepository.findById(swiperId).orElseThrow(() -> new RuntimeException("Swiper not found"));
        User swiped = userRepository.findById(swipedId)
                .orElseThrow(() -> new RuntimeException("Swiped user not found"));

        // Create and save the swipe
        Swipe swipe = new Swipe();
        swipe.setSwiper(swiper);
        swipe.setSwiped(swiped);
        swipe.setLiked(true);
        swipe.setTimestamp(LocalDateTime.now());
        swipeRepository.save(swipe);

        // Check if the swiped user has already liked the swiper (match creation)
        Optional<Swipe> mutualSwipe = swipeRepository.findBySwiperAndSwipedAndLiked(swiped, swiper, true);
        if (mutualSwipe.isPresent()) {
            // Create a match if both users liked each other
            Match match = new Match();
            match.setUser1(swiper);
            match.setUser2(swiped);
            match.setMatchedAt(LocalDateTime.now());
            matchRepository.save(match);
            return true;
        }
        return false;
    }

    /**
     * Records a swipe and creates a match if necessary
     * 
     * @param swiperId ID of the user who swipes
     * @param swipedId ID of the user who is swiped
     * @return true if a match is created, false otherwise
     */
    @Transactional
    public boolean dislikeUser(Long swiperId, Long swipedId) {
        User swiper = userRepository.findById(swiperId).orElseThrow(() -> new RuntimeException("Swiper not found"));
        User swiped = userRepository.findById(swipedId)
                .orElseThrow(() -> new RuntimeException("Swiped user not found"));

        // Create and save the swipe
        Swipe swipe = new Swipe();
        swipe.setSwiper(swiper);
        swipe.setSwiped(swiped);
        swipe.setLiked(false);
        swipe.setTimestamp(LocalDateTime.now());
        swipeRepository.save(swipe);

        return false;
    }
}
