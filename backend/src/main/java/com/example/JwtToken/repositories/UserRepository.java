package com.example.JwtToken.repositories;

import com.example.JwtToken.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Finds a user by their login identifier
     *
     * @param login The login identifier of the user to find
     * @return An optional containing the user if found, or empty if not found
     */
    Optional<User> findByLogin(String login);

    /**
     * Checks if a user with the given login already exists
     *
     * @param login The login identifier to check
     * @return true if a user with the given login exists, false otherwise
     */
    boolean existsByLogin(String login);

    @Query("SELECT u FROM User u WHERE u.id <> :currentUserId")
    List<User> findAllExceptCurrentUser(@Param("currentUserId") Long currentUserId);
}

