package com.example.Book_Library_Management_System.exception;

public class IssuedBookNotFoundException extends RuntimeException {
    public IssuedBookNotFoundException(String message) {
        super(message);
    }
}
