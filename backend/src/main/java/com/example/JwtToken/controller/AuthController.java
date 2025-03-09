/**
 * Controller class handling authentication endpoints
 */
package com.example.JwtToken.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.JwtToken.dto.LoginRequestDTO;
import com.example.JwtToken.dto.SignUpRequestDTO;
import com.example.JwtToken.entities.User;
import com.example.JwtToken.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    /**
     * Endpoint for user registration
     * 
     * @param signUpRequest DTO containing user registration data
     * @return ResponseEntity with created user or error message
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequestDTO signUpRequest) {
        User user = authenticationService.registerUser(signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    /**
     * Endpoint for user authentication
     * 
     * @param loginRequest DTO containing login credentials
     * @return ResponseEntity with JWT token and user details
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authenticationService.authenticateUser(loginRequest));
    }
}