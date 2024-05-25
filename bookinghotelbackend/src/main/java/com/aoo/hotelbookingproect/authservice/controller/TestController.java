package com.aoo.hotelbookingproect.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class TestController {
    @GetMapping("/demo")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> demot(){
        return ResponseEntity.ok("Demo test!");
    }

}
