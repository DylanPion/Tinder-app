package com.example.JwtToken.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
/**
 * UserDetailsImpl class implements UserDetails interface
 * Represents user details for authentication and authorization
 */
public class UserDetailsImpl implements UserDetails {

    /**
     * Serial version UID for serialization
     */
    private static final long serialVersionUID = 1L;
    /**
     * The ID of the user
     */
    private Long id;
    /**
     * The username of the user
     */
    private String username;
    /**
     * The first name of the user
     */
    private String firstName;
    /**
     * The last name of the user
     */
    private String lastName;
    /**
     * The authorities of the user
     */
    private Collection<? extends GrantedAuthority> authorities;

    /**
     * The password of the user
     */
    @JsonIgnore
    private String password;

    /**
     * Constructor for UserDetailsImpl
     * 
     * @param id          The ID of the user
     * @param username    The username of the user
     * @param password    The password of the user
     * @param firstName   The first name of the user
     * @param lastName    The last name of the user
     * @param authorities The authorities of the user
     */
    public UserDetailsImpl(Long id, String username, String password, String firstName, String lastName,
            Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authorities = authorities;
    }

    /**
     * Builds a UserDetailsImpl object from a User object
     * 
     * @param user The User object to build the UserDetailsImpl from
     * @return A UserDetailsImpl object
     */
    public static UserDetailsImpl build(User user) {

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new UserDetailsImpl(
                user.getId(),
                user.getLogin(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                authorities);
    }

    /**
     * Returns the authorities of the user
     * 
     * @return The authorities of the user
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
    }

    /**
     * Returns true if the account is not expired
     * 
     * @return true if the account is not expired
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Returns true if the account is not locked
     * 
     * @return true if the account is not locked
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Returns true if the credentials are not expired
     * 
     * @return true if the credentials are not expired
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Returns true if the account is enabled
     * 
     * @return true if the account is enabled
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
