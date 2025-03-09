package com.example.JwtToken.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.JwtToken.entities.Match;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

}
