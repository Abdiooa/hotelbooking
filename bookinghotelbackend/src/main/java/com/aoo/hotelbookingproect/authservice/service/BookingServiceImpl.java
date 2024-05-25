package com.aoo.hotelbookingproect.authservice.service;

import com.aoo.hotelbookingproect.authservice.dto.BookingDto;
import com.aoo.hotelbookingproect.authservice.dto.BookingResponse;
import com.aoo.hotelbookingproect.authservice.dto.UpdateBookingRequest;
import com.aoo.hotelbookingproect.authservice.entity.Booking;
import com.aoo.hotelbookingproect.authservice.entity.BookingStatus;
import com.aoo.hotelbookingproect.authservice.entity.Room;
import com.aoo.hotelbookingproect.authservice.entity.User;
import com.aoo.hotelbookingproect.authservice.exceptions.BookingNotFoundException;
import com.aoo.hotelbookingproect.authservice.exceptions.RoomNotFoundException;
import com.aoo.hotelbookingproect.authservice.exceptions.UserNotFoundException;
import com.aoo.hotelbookingproect.authservice.repository.BookingRepository;
import com.aoo.hotelbookingproect.authservice.repository.RoomRepository;
import com.aoo.hotelbookingproect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Override
    public String saveBooking(Long roomId, BookingDto bookingDto) {
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (roomOptional.isEmpty()) {
            throw new RoomNotFoundException("Room not found!");
        }
        Optional<User> userOptional = userRepository.findById(bookingDto.getUserId());
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("User Not Found!");
        }
        Room room = roomOptional.get();
        var user = userOptional.get();
        if (room.isBooked() || !room.isAvailableForDates(bookingDto.getCheckInDate(), bookingDto.getCheckOutDate())) {
            throw new RuntimeException("Sorry, this room is not available for the selected dates.");
        }

        if (!isBookingValid(bookingDto.getCheckOutDate(), bookingDto.getCheckInDate())) {
            throw new RuntimeException("Check-in date must come before check-out date.");
        }
        var booking = mapToBooking(bookingDto);
        booking.setRoom(room);
        booking.setUser(user);
        long nights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        var totalPrice = BigDecimal.valueOf(nights).multiply(room.getPrice());
        booking.setTotalPrice(totalPrice);
        Booking savedBooking = bookingRepository.save(booking);
        room.addBooking(savedBooking);
        return "Booked successfully";
    }

    @Override
    public List<Booking> getAllBookingsByRoomId(Long roomId) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);
        if(optionalRoom.isEmpty()){
            throw new RoomNotFoundException("Room not found!");
        }
        return optionalRoom.get().getBookings();
    }



    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::mapToBookingResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(this::mapToBookingResponse).collect(Collectors.toList());
    }
    @Override
    @Transactional
    public void cancelBooking(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isEmpty()) {
            throw new BookingNotFoundException("Booking not found!");
        }

        Booking booking = bookingOptional.get();
        booking.setStatus(BookingStatus.CANCELED);
        Room room = booking.getRoom();
        bookingRepository.save(booking);

        room.setBooked(false);
        roomRepository.save(room);
    }

    @Override
    public void updateBooking(Long bookingId, UpdateBookingRequest bookingRequest) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isEmpty()) {
            throw new BookingNotFoundException("Booking not found!");
        }

        Booking booking = optionalBooking.get();

        switch (bookingRequest.getStatus().toUpperCase()) {
            case "CONFIRM":
                booking.setStatus(BookingStatus.CONFIRMED);
                break;
            case "REJECT":
                booking.setStatus(BookingStatus.REJECTED);
                break;
            default:
                throw new IllegalArgumentException("Invalid booking status: " + bookingRequest);
        }

        bookingRepository.save(booking);
    }


    private boolean isBookingValid(LocalDate checkOutDate, LocalDate checkInDate) {
        return checkOutDate.isAfter(checkInDate);
    }

    private Booking mapToBooking(BookingDto bookingDto){
        return Booking.builder()
                .checkInDate(bookingDto.getCheckInDate())
                .checkOutDate(bookingDto.getCheckOutDate())
                .status(BookingStatus.PENDING).build();
    }

    private BookingResponse mapToBookingResponse(Booking booking) {
        return BookingResponse.builder()
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .totalPrice(booking.getTotalPrice())
                .bookingId(booking.getId())
                .roomPrice(booking.getRoom().getPrice())
                .returnedPhoto(booking.getRoom().getPhoto())
                .roomType(booking.getRoom().getRoomType())
                .status(booking.getStatus().toString())
                .numberOfDays((int) ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate()))
                .build();
    }
}