package com.example.JwtToken.service;

import com.example.JwtToken.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import com.example.JwtToken.entities.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
/**
 * User service
 */
public class UserService {

    /**
     * User repository
     */
    private final UserRepository userRepository;

    /**
     * Get the current user
     */
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("User not authenticated");
        }
        return (User) authentication.getPrincipal();
    }

    /**
     * Get all users
     */
    public List<User> getAllUsers(Long currentUserId) {
        return userRepository.findAllExceptCurrentUser(currentUserId);
    }

    /**
     * Get random users
     */
    public User getRandomUser() {
        // TODO Créer une méthode qui retourne un utilsiateur random qui n'a jamais été rencontré
        return null;
    }
}
