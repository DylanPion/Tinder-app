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
@Table(name = "swipes")
@Data
@NoArgsConstructor
/**
 * Entity class representing a swipe in the system
 */
public class Swipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User who swiped
     */
    @ManyToOne
    private User swiper;

    /**
     * User who was swiped
     */
    @ManyToOne
    private User swiped;

    /**
     * True if liked, False if disliked
     */
    private boolean liked;

    /**
     * Timestamp of the swipe
     */
    private LocalDateTime timestamp;
}
