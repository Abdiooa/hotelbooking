package com.aoo.hotelbookingproect.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private LocalDate checkInDate;
    private Long bookingId;
    private LocalDate checkOutDate;
    private BigDecimal totalPrice;
    private BigDecimal roomPrice;
    private byte[] returnedPhoto;
    private String roomType;
    private int numberOfDays;
    private String status;
}
