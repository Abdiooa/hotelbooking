package com.aoo.hotelbookingproect.authservice.dto;

import com.aoo.hotelbookingproect.authservice.entity.EnumRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private EnumRole role;
}
