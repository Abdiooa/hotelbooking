export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RoomData {
  roomType: string;
  price: number | null;
  roomPhoto: File | null;
}

export interface RoomUpdateDto {
  roomType: string;
  price: number | null;
}
export interface Room {
  id: number;
  roomType: string;
  price: number | null;
  isBooked: boolean | null;
  returnedPhoto: any | null;
  roomPhoto: File | null;
}

export interface Booking {
  bookingId: number;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  returnedPhoto: string;
  numberOfDays: number | null;
  roomPrice: number | null;
  totalPrice: number | number;
}
export interface BookingFormData {
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
}

export interface UpdateBookingData {
  status: string | null;
}

export interface SearchRoomsData {
  checkInDate: Date;
  checkOutDate: Date;
  roomType: string;
}
