package com.aoo.hotelbookingproect.authservice.exceptions;

public class BookingNotFoundException extends RuntimeException{
    private String message;
    public BookingNotFoundException(String message){
        super(message);
        this.message = message;
    }

    public BookingNotFoundException(){

    }
}
