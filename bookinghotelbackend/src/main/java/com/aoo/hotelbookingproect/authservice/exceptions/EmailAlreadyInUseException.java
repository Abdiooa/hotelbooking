package com.aoo.hotelbookingproect.authservice.exceptions;

public class EmailAlreadyInUseException extends RuntimeException{
    private String message;

    public EmailAlreadyInUseException(String message){
        super(message);
        this.message = message;
    }
}
