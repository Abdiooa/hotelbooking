package com.aoo.hotelbookingproect.authservice.service;


import com.aoo.hotelbookingproect.authservice.dto.RoomDto;
import com.aoo.hotelbookingproect.authservice.dto.RoomUpdateDto;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    boolean postRoom(RoomDto roomDto) throws IOException;

    List<RoomDto> getAllRooms();

    RoomDto getRoomById(Long id);

    void deleteRoomById(Long id);

    boolean updateRoom(Long id, RoomUpdateDto roomDto) throws Exception;
    List<RoomDto> searchRooms(String roomType);
}
