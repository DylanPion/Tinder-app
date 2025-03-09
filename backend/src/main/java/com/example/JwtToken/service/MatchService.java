package com.example.JwtToken.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.JwtToken.entities.Match;
import com.example.JwtToken.repositories.MatchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final MatchRepository matchRepository;

    /**
     * Get all matches
     * 
     * @return List of all matches
     */
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }
}
