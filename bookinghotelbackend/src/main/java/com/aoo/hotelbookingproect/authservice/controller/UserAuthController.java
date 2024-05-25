package com.aoo.hotelbookingproect.authservice.controller;

import com.aoo.hotelbookingproect.authservice.dto.AuthenticationResponse;
import com.aoo.hotelbookingproect.authservice.dto.SingInRequest;
import com.aoo.hotelbookingproect.authservice.dto.UserRequest;
import com.aoo.hotelbookingproect.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class UserAuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest){
        try{
            return new ResponseEntity<>(authService.signup(userRequest), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> login(@RequestBody SingInRequest loginRequest){
        try {
            AuthenticationResponse authenticationResponse = authService.authenticate(loginRequest);
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Authorization", "Bearer "+ authenticationResponse.getToken());

//            Map<String, Object> responseBody = new HashMap<>();
//            responseBody.put("username", authenticationResponse.getUsername());
//            responseBody.put("userRole", authenticationResponse.getUserRole());

            return ResponseEntity.ok()
//                    .headers(headers)
                    .body(authenticationResponse);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
