package com.example.Book_Library_Management_System.exception;

import com.example.Book_Library_Management_System.entity.ResponseStructure;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class BooksExceptionHandler {

    @ExceptionHandler(BooksNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleBooksNotFound(BooksNotFoundException exception) {

        ResponseStructure<String> structure = new ResponseStructure<>();
        structure.setMessage(exception.getMessage());
        structure.setStatusCode(HttpStatus.NOT_FOUND.value());
        structure.setData("books not found");

        return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleMemberNotFound(MemberNotFoundException ex) {
        ResponseStructure<String> structure = new ResponseStructure<>();
        structure.setMessage(ex.getMessage());
        structure.setStatusCode(HttpStatus.NOT_FOUND.value());
        structure.setData("member not found");
        return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BookNotAvailableException.class)
    public ResponseEntity<ResponseStructure<String>> handleBookNotAvailable(BookNotAvailableException ex) {
        ResponseStructure<String> structure = new ResponseStructure<>();
        structure.setMessage(ex.getMessage());
        structure.setStatusCode(HttpStatus.BAD_REQUEST.value());
        structure.setData("No copies available");
        return new ResponseEntity<>(structure, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IssuedBookNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleIssuedBookNotFound(IssuedBookNotFoundException ex) {
        ResponseStructure<String> structure = new ResponseStructure<>();
        structure.setMessage(ex.getMessage());
        structure.setStatusCode(HttpStatus.NOT_FOUND.value());
        structure.setData("Issued record not found");
        return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
    }



}
