package com.aoo.hotelbookingproect.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BookingDto {
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Long userId;
}
