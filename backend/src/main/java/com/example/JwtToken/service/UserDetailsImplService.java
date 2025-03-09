package com.example.JwtToken.service;

import com.example.JwtToken.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.JwtToken.entities.User;
import com.example.JwtToken.entities.UserDetailsImpl;

import lombok.RequiredArgsConstructor;

/**
 * Service implementation for loading user details
 */
@Service
@RequiredArgsConstructor
public class UserDetailsImplService implements UserDetailsService {
    private final UserRepository userRepository;
    /**
     * Loads a user by their username (login)
     *
     * @param username The login identifier of the user
     * @return UserDetails object containing the user information
     * @throws UsernameNotFoundException if user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur : " + username));

        return UserDetailsImpl.build(user);
    }
}

