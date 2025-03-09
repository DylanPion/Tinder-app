package com.example.JwtToken.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Message {

    /**
     * Message ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Message content
     */
    private String content;

    /**
     * Message timestamp
     */
    private LocalDateTime timestamp;

    /**
     * Message sender
     */
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    /**
     * Message receiver
     */
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    /**
     * Message match
     */
    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;
}