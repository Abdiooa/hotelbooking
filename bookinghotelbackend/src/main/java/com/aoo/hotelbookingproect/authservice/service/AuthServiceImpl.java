package com.aoo.hotelbookingproect.authservice.service;


import com.aoo.hotelbookingproect.authservice.dto.AuthenticationResponse;
import com.aoo.hotelbookingproect.authservice.dto.MessageResponse;
import com.aoo.hotelbookingproect.authservice.dto.SingInRequest;
import com.aoo.hotelbookingproect.authservice.dto.UserRequest;
import com.aoo.hotelbookingproect.authservice.entity.EnumRole;
import com.aoo.hotelbookingproect.authservice.entity.User;
import com.aoo.hotelbookingproect.authservice.exceptions.EmailAlreadyInUseException;
import com.aoo.hotelbookingproect.authservice.exceptions.UserNotFoundException;
import com.aoo.hotelbookingproect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public MessageResponse signup(UserRequest userRequest) {
        if(userRepository.existsByEmail(userRequest.getEmail()))
            throw new EmailAlreadyInUseException("Email Already in use. please change your email");

        var user = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .role(EnumRole.USER)
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .build();
        userRepository.save(user);
        return MessageResponse.builder()
                .message("User Registered Successfully!").build();
    }


    @Override
    public AuthenticationResponse authenticate(SingInRequest singInRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(singInRequest.getEmail(), singInRequest.getPassword())
        );

        var user = userRepository.findByEmail(singInRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(" Invalid email or password"));

        var jwt = jwtService.generateToken(user.getEmail());
        return AuthenticationResponse
                .builder().token(jwt).username(user.getFirstName()).userRole(user.getRole()).userId(user.getId()).build();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("User not Found!");
        }
        return optionalUser.get();
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("User not Found!");
        }
        return optionalUser.get();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
