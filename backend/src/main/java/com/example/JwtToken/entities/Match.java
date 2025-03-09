package com.example.JwtToken.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
/**
 * Entity class representing a match in the system
 */
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User who matched
     */
    @ManyToOne
    private User user1;

    /**
     * User who matched
     */
    @ManyToOne
    private User user2;

    /**
     * Timestamp of the match
     */
    private LocalDateTime matchedAt;
}
