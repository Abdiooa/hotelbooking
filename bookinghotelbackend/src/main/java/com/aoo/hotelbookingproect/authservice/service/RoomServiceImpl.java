package com.aoo.hotelbookingproect.authservice.service;


import com.aoo.hotelbookingproect.authservice.dto.RoomDto;
import com.aoo.hotelbookingproect.authservice.dto.RoomUpdateDto;
import com.aoo.hotelbookingproect.authservice.entity.Room;
import com.aoo.hotelbookingproect.authservice.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public boolean postRoom(RoomDto roomDto) {
        try {
            Room room = mapToRoom(roomDto);

            room.setBooked(false);
            roomRepository.save(room);
            return true;
        } catch (IOException e) {
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll().stream().map(Room::getRoomDto).collect(Collectors.toList());
    }

    @Override
    public RoomDto getRoomById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.map(Room::getRoomDto).orElse(null);
    }

    @Override
    public void deleteRoomById(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public boolean updateRoom(Long id, RoomUpdateDto roomDto) throws IOException {
        try
        {
            Optional<Room> optionalRoom = roomRepository.findById(id);
            if(optionalRoom.isPresent()){
                optionalRoom.get().setRoomType(roomDto.getRoomType());
                optionalRoom.get().setPrice(roomDto.getPrice());
//                optionalRoom.get().setPhoto(roomDto.getRoomPhoto().getBytes());
                roomRepository.save(optionalRoom.get());
                return true;
            }
            return false;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<RoomDto> searchRooms(String roomType) {

        List<Room> rooms = roomRepository.findAll();
        return rooms.stream()
                .filter(room -> room.getRoomType().equalsIgnoreCase(roomType) && !room.isBooked())
                .map(Room::getRoomDto)
                .collect(Collectors.toList());
    }


    private Room mapToRoom(RoomDto roomDto) throws IOException, SQLException {
        if(!roomDto.getRoomPhoto().isEmpty()){
            byte[] imageData = roomDto.getRoomPhoto().getBytes();
//            Blob photoBlob = new SerialBlob(imageData);
            return Room.builder()
                    .roomType(roomDto.getRoomType())
                    .price(roomDto.getPrice())
                    .photo(imageData)
                    .build();
        }
        return null;
    }
}
