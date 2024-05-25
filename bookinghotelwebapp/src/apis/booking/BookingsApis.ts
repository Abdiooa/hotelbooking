import axiosHttp from "../../helpers/AxiosInterceptor";
import { BookingFormData, UpdateBookingData } from "../common/Types";

export const getUserBookings = async (userId: number) => {
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
    return await axiosHttp.get(`/api/v1/bookings/user/${userId}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const bookRoom = async (
  roomId: number,
  bookingFromData: BookingFormData
) => {
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
    return await axiosHttp.post(
      `/api/v1/bookings/room/${roomId}/booking`,
      bookingFromData,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllBooking = async () => {
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
    return await axiosHttp.get("/api/v1/bookings", config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBooking = async (
  bookingId: number,
  status: UpdateBookingData
) => {
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
    return await axiosHttp.patch(
      `/api/v1/bookings/updateBooking/${bookingId}`,
      status,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
