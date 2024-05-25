package com.aoo.hotelbookingproect.authservice.service;


import com.aoo.hotelbookingproect.authservice.dto.AuthenticationResponse;
import com.aoo.hotelbookingproect.authservice.dto.MessageResponse;
import com.aoo.hotelbookingproect.authservice.dto.SingInRequest;
import com.aoo.hotelbookingproect.authservice.dto.UserRequest;
import com.aoo.hotelbookingproect.authservice.entity.User;

import java.util.List;

public interface AuthService {
    MessageResponse signup(UserRequest userRequest);
    AuthenticationResponse authenticate(SingInRequest singInRequest);
    User getUserById(Long id);
    User getUserByEmail(String email);
    List<User> getAllUsers();
}
