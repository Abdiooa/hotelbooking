package com.aoo.hotelbookingproect.authservice.controller;

import com.aoo.hotelbookingproect.authservice.dto.BookingDto;
import com.aoo.hotelbookingproect.authservice.dto.BookingResponse;
import com.aoo.hotelbookingproect.authservice.dto.UpdateBookingRequest;
import com.aoo.hotelbookingproect.authservice.entity.Booking;
import com.aoo.hotelbookingproect.authservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bookings")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> addBooking(@PathVariable("roomId") Long roomId,
                                        @RequestBody BookingDto booking) {
        try {
            System.out.println(roomId);
            System.out.println(booking);
            String result = bookingService.saveBooking(roomId, booking);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PatchMapping("/updateBooking/{bookingId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateBookingStatus(@PathVariable("bookingId") Long bookingId,
                                                 @RequestBody UpdateBookingRequest request) {
        try {
            bookingService.updateBooking(bookingId, request);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping("")
    public ResponseEntity<List<BookingResponse>> getBookings() {
        try {
            List<BookingResponse> bookings = bookingService.getAllBookings();
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserId(@PathVariable("userId") Long userId){
        try {
            List<BookingResponse> bookings = bookingService.getBookingsByUserId(userId);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Booking>> getBookingsByRoomId(@PathVariable("roomId") Long roomId) {
        try {
            List<Booking> bookings = bookingService.getAllBookingsByRoomId(roomId);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{bookingId}/booking")
    public ResponseEntity<?> cancelBooking(@PathVariable("bookingId") Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
