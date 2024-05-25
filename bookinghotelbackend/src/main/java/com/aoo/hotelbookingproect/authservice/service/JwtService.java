package com.aoo.hotelbookingproect.authservice.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractUserByName(String token);
    String generateToken(String userEmail);

    boolean isTokenValid(String token, UserDetails userDetails);
}
