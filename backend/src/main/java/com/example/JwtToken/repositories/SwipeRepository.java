package com.example.JwtToken.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.JwtToken.entities.Swipe;
import com.example.JwtToken.entities.User;
import org.springframework.stereotype.Repository;

@Repository
public interface SwipeRepository extends JpaRepository<Swipe, Long> {

    /**
     * Find a swipe by the swiper and swiped user and if it is liked
     *
     * @param swiped The swiped user
     * @param swiper The swiper user
     * @param liked  The liked status
     * @return The swipe
     */
    Optional<Swipe> findBySwiperAndSwipedAndLiked(User swiped, User swiper, boolean b);
}
