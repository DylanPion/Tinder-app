package com.example.JwtToken.dto;

import lombok.Data;

@Data
public class SignUpRequestDTO {
    /**
     * User's login identifier
     */
    private String email;

    /**
     * User's password for authentication
     */
    private String password;

    /**
     * User's first name
     */
    private String firstName;

    /**
     * User's last name
     */
    private String lastName;

    /**
     * User's gender
     */
    private String gender;

    /**
     * User's location
     */
    private String location;



}
