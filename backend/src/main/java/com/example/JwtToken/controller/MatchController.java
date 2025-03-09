
package com.example.JwtToken.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JwtToken.entities.Match;
import com.example.JwtToken.service.MatchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    /**
     * Get all matches
     * 
     * @return List<Match>
     */
    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }
}
