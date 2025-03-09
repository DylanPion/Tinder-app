package com.example.JwtToken.token;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.JwtToken.service.JwtService;
import com.example.JwtToken.service.UserDetailsImplService;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsImplService userDetailsService;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    /**
     * Filters incoming requests to check for JWT authentication
     * 
     * @param request     The HTTP request
     * @param response    The HTTP response
     * @param filterChain The filter chain
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Get JWT token from Authorization header
            String jwt = parseJwt(request);
            // Verify and validate JWT token
            if (jwt != null && jwtService.validateJwtToken(jwt)) {
                // Extract username from token
                String username = jwtService.getUserNameFromJwtToken(jwt);

                // Find User by Username and create UserDetailsImpl from it
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Create authentication instance with user details
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null,
                        userDetails.getAuthorities());

                // Add authentication details based on request
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set authentication in security context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Log error message if authentication fails
            logger.error("Cannot set user authentication: {}", e);
        }

        // Pass request to next filter in chain
        filterChain.doFilter(request, response);
    }

    // Method to extract JWT token from Authorization header
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            // Return JWT token by removing "Bearer " prefix
            return headerAuth.substring(7, headerAuth.length());
        }

        // Return null if header is not present or doesn't start with "Bearer "
        return null;
    }
}