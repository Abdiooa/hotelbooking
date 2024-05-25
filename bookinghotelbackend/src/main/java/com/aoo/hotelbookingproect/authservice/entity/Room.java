package com.aoo.hotelbookingproect.authservice.entity;

import com.aoo.hotelbookingproect.authservice.dto.RoomDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_type", nullable = false)
    private String roomType;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "is_booked", nullable = false)
    private boolean isBooked;

//    @Column(name = "capacity", nullable = false)
//    private int capacity;
//
//    @Column(name = "description", nullable = false)
//    private String description;

    @Lob
    @Column(nullable = true)
    private byte[] photo;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    public RoomDto getRoomDto() {
        return RoomDto.builder()
                .id(id)
                .roomType(roomType)
                .price(price)
                .isBooked(isBooked)
                .returnedPhoto(photo)
                .build();
    }

    public boolean isAvailableForDates(LocalDate checkIn, LocalDate checkOut) {
        return bookings.stream().noneMatch(booking ->
                booking.getCheckInDate().isBefore(checkOut) && booking.getCheckOutDate().isAfter(checkIn));
    }

    public void addBooking(Booking booking) {
        if (isAvailableForDates(booking.getCheckInDate(), booking.getCheckOutDate())) {
            bookings.add(booking);
            booking.setRoom(this);
//            if (bookings.size() == capacity) {
            this.isBooked = true;
//            }
        } else {
            throw new RuntimeException("The room is not available for the selected dates.");
        }
    }
}
