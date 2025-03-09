package com.example.JwtToken.controller;

import java.util.List;

import com.example.JwtToken.entities.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JwtToken.entities.User;
import com.example.JwtToken.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
/**
 * Controller for handling user-related endpoints
 */
public class UserController {

    private final UserService userService;

    /**
     * Get the current user
     */
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    /**
     * Get all users
     */
    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(userService.getAllUsers(userDetails.getId()));
    }

    /**
     * Get a random user
     */
    @GetMapping("/swipe")
    public ResponseEntity<User> getRandomUser() {
        return ResponseEntity.ok(userService.getRandomUser());
    }
}
