import { RoomData, RoomUpdateDto } from "../common/Types";
import axiosHttp from "../../helpers/AxiosInterceptor";

export const addRoom = async (roomData: RoomData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("user not authenticate!");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    return await axiosHttp.post("/api/v1/rooms/add-room", roomData, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllRooms = async () => {
  try {
    return await axiosHttp.get("/api/v1/rooms");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteARoom = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("user not authenticate!");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axiosHttp.delete(`/api/v1/rooms/${id}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getARoom = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("user not authenticate!");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axiosHttp.get(`/api/v1/rooms/${id}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateRoom = async (id: number, roomData: RoomUpdateDto) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("user not authenticate!");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axiosHttp.patch(`/api/v1/rooms/${id}`, roomData, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const filterByRoomType = async (roomType: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      roomType: roomType,
    },
  };

  try {
    return await axiosHttp.get("/api/v1/rooms/search", config);
  } catch (error) {
    return Promise.reject(error);
  }
};
