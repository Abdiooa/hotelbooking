package com.aoo.hotelbookingproect.authservice.service;

import com.aoo.hotelbookingproect.authservice.dto.BookingDto;
import com.aoo.hotelbookingproect.authservice.dto.BookingResponse;
import com.aoo.hotelbookingproect.authservice.dto.UpdateBookingRequest;
import com.aoo.hotelbookingproect.authservice.entity.Booking;

import java.util.List;

public interface BookingService {
    String saveBooking(Long roomId, BookingDto bookingDto);

    List<Booking> getAllBookingsByRoomId(Long roomId);
    void cancelBooking(Long bookingId);

    List<BookingResponse> getAllBookings();

    List<BookingResponse> getBookingsByUserId(Long userId);
    void updateBooking(Long BookingId, UpdateBookingRequest status);
}
