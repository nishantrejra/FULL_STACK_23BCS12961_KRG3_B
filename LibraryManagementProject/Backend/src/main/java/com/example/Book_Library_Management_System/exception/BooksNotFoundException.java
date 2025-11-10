package com.example.Book_Library_Management_System.exception;

public class BooksNotFoundException extends RuntimeException{

    public BooksNotFoundException(String message) {
        super(message);
    }
}
