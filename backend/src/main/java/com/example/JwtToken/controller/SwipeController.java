package com.example.JwtToken.controller;

import com.example.JwtToken.entities.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JwtToken.service.SwipeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/swipe")
@RequiredArgsConstructor
public class SwipeController {

    private final SwipeService swipeService;

    /**
     * Like a user
     * 
     * @param swipedId
     * @return ResponseEntity<?>
     */
    @PostMapping("/like/{swipedId}")
    public ResponseEntity<?> likeUser(@PathVariable Long swipedId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(swipeService.likeUser(userDetails.getId(), swipedId));
    }

    /**
     * Dislike a user
     * 
     * @param swipedId
     * @return ResponseEntity<?>
     */
    @PostMapping("/dislike/{swipedId}")
    public ResponseEntity<?> dislikeUser(@PathVariable Long swipedId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(swipeService.dislikeUser(userDetails.getId(), swipedId));
    }
}
