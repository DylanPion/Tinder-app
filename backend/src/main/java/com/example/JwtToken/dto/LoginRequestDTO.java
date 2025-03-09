package com.example.JwtToken.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    /**
     * User's login identifier
     */
    private String email;

    /**
     * User's password for authentication
     */
    private String password;
}
