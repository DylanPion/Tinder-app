package com.example.JwtToken.response;

import java.util.List;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
/**
 * Response class for JWT authentication
 * Contains the JWT token, user details, and roles
 */
public class JwtResponse {

    /**
     * The JWT token
     */
    private final String token;
    /**
     * The user's ID
     */
    private final Long id;
    /**
     * The user's email
     */
    private final String email;

    /**
     * The user's first name
     */
    private final String firstName;
    /**
     * The user's last name
     */
    private final String lastName;
    /**
     * The user's roles
     */
    private final List<String> roles;
    /**
     * The type of token
     */
    private static final String TYPE = "Bearer";
}
