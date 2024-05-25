package com.aoo.hotelbookingproect.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RoomDto {
    private Long id;
    private String roomType;
    private BigDecimal price;
    private boolean isBooked;
    private MultipartFile roomPhoto;
    private byte[] returnedPhoto;
}
