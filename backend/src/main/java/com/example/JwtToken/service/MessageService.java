package com.example.JwtToken.service;

import java.time.LocalDateTime;
import java.util.List;

import com.example.JwtToken.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.example.JwtToken.dto.MessageDTO;
import com.example.JwtToken.entities.Message;
import com.example.JwtToken.entities.User;
import com.example.JwtToken.repositories.MessageRepositoy;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepositoy messageRepository;
    private final UserRepository userRepository;

    /**
     * Get all messages
     * 
     * @return List of all messages
     */
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    /* Send a message */
    public Message sendMessage(MessageDTO message) {
        Message messageEntity = new Message();
        messageEntity.setContent(message.getContent());
        messageEntity.setTimestamp(LocalDateTime.now());
        User receiver = userRepository.findById(message.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));
        User sender = userRepository.findById(message.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        messageEntity.setReceiver(receiver);
        messageEntity.setSender(sender);
        return messageRepository.save(messageEntity);
        // TODO AJOUTER LE MATCH
    }
}
