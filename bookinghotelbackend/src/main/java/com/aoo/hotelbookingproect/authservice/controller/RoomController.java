package com.aoo.hotelbookingproect.authservice.controller;


import com.aoo.hotelbookingproect.authservice.dto.RoomDto;
import com.aoo.hotelbookingproect.authservice.dto.RoomUpdateDto;
import com.aoo.hotelbookingproect.authservice.entity.Room;
import com.aoo.hotelbookingproect.authservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class RoomController {
    private final RoomService roomService;

    @PostMapping("/rooms/add-room")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> postRoom(@ModelAttribute RoomDto roomDto){
        System.out.println("entreer");
        System.out.println(roomDto);
        try {
            boolean roomSaved = roomService.postRoom(roomDto);
            if (roomSaved) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Room saved successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save room.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving room: " + e.getMessage());
        }
    }

    @PatchMapping("/rooms/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateRoom(@PathVariable("id") Long id, @RequestBody RoomUpdateDto roomDto) {
        try {
            boolean roomUpdated = roomService.updateRoom(id, roomDto);
            if (roomUpdated) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update room.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update room.");
        }
    }


    @GetMapping("/rooms")
    public ResponseEntity<?> getRooms() {
        List<RoomDto> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<RoomDto> getRoom(@PathVariable("id") Long id) {
        RoomDto room = roomService.getRoomById(id);
        if (room != null) {
            return ResponseEntity.ok(room);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/rooms/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteRoom(@PathVariable("id") Long id) {
        try {
            roomService.deleteRoomById(id);
            return ResponseEntity.ok("Room deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting room: " + e.getMessage());
        }
    }

    @GetMapping("/rooms/search")
    public ResponseEntity<?> searchRooms(@RequestParam String roomType){
        try{
            List<RoomDto> rooms = roomService.searchRooms(roomType);
            return ResponseEntity.ok(rooms);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}

