package com.example.JwtToken.dto;

import lombok.Data;

@Data
public class MessageDTO {
    /**
     * Message content
     */
    private String content;

    /**
     * Message sender
     */
    private Long senderId;

    /**
     * Message receiver
     */
    private Long receiverId;
}
