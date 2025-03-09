package com.example.JwtToken.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
/**
 * Entity class representing a user in the system
 */
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String login;

    /**
     * The password for the user
     */
    private String password;

    /**
     * The first name of the user
     */
    private String firstName;

    /**
     * The last name of the user
     */
    private String lastName;

    /**
     * The age of the user
     */
    private String age;

    /**
     * The gender of the user
     */
    private String gender;

    /**
     * The location of the user
     */
    private String location;

    /**
     * The link of the user's picture
     */
    private String imageUrl;

    /**
     * The roles of the user
     */
    @ElementCollection // Indique que 'roles' est une collection d'éléments simples
    private List<String> roles = new ArrayList<>();

    /**
     * The creation date of the user
     */
    private LocalDate createdAt;
}
