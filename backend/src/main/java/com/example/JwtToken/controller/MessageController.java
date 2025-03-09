package com.example.JwtToken.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JwtToken.dto.MessageDTO;
import com.example.JwtToken.entities.Message;
import com.example.JwtToken.service.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    /**
     * Get all messages
     * 
     * @return List<Message>
     */
    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    /**
     * Send a message
     * 
     * @param message
     * @return Message
     */
    @PostMapping
    public Message sendMessage(@RequestBody MessageDTO message) {
        return messageService.sendMessage(message);
    }
}
