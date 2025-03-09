package com.example.JwtToken.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.JwtToken.entities.Message;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepositoy extends JpaRepository<Message, Long> {

}
