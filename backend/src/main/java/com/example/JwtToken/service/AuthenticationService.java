package com.example.JwtToken.service;

import com.example.JwtToken.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.JwtToken.dto.LoginRequestDTO;
import com.example.JwtToken.dto.SignUpRequestDTO;
import com.example.JwtToken.entities.User;
import com.example.JwtToken.entities.UserDetailsImpl;
import com.example.JwtToken.response.JwtResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user in the system
     *
     * @param signUpRequest DTO containing user registration data
     * @return The created user entity
     * @throws IllegalArgumentException if the email already exists
     */
    public User registerUser(SignUpRequestDTO signUpRequest) {

        if (userRepository.existsByLogin(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        User user = new User();
        user.setLogin(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setLastName(signUpRequest.getLastName());
        user.setFirstName(signUpRequest.getFirstName());
        user.setGender(signUpRequest.getGender());
        user.setLocation(signUpRequest.getLocation());
        user.getRoles().add("USER"); // Add default user role
        user.setCreatedAt(LocalDate.now());
        return userRepository.save(user);
    }

    /**
     * Authenticates a user and generates a JWT token
     * 
     * @param loginRequest DTO containing login credentials
     * @return JwtResponse containing JWT token and user details
     */
    public JwtResponse authenticateUser(LoginRequestDTO loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // Set authentication in Security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String jwt = jwtService.generateJwtToken(authentication);

        // Get the detail of the user log in
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Get user roles
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Return JWT
        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                roles);
    }
}