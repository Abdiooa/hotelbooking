package com.aoo.hotelbookingproect.authservice.dto;

import com.aoo.hotelbookingproect.authservice.entity.EnumRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private EnumRole userRole;
    private String token;
    private String username;
    private Long userId;
}
