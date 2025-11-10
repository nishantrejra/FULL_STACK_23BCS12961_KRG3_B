package com.example.Book_Library_Management_System.controller;

import com.example.Book_Library_Management_System.entity.IssuedBook;
import com.example.Book_Library_Management_System.entity.ResponseStructure;
import com.example.Book_Library_Management_System.service.IssuedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issued-books")
@CrossOrigin(origins = "*")
public class IssuedBookController {

    @Autowired
    private IssuedBookService issuedBookService;

    @PostMapping("/issue/{bookId}/{memberId}")
    public ResponseEntity<ResponseStructure<IssuedBook>> issueBook(@PathVariable int bookId, @PathVariable int memberId) {
        return issuedBookService.issueBook(bookId, memberId);
    }

    @PutMapping("/return/{issuedBookId}")
    public ResponseEntity<ResponseStructure<IssuedBook>> returnBook(@PathVariable int issuedBookId) {
        return issuedBookService.returnBook(issuedBookId);
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<List<IssuedBook>>> getAllIssuedBooks() {
        return issuedBookService.getAllIssuedBooks();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteIssuedBook(@PathVariable int id) {
        return issuedBookService.deleteIssuedBookById(id);
    }
}
