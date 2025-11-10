package com.example.Book_Library_Management_System.controller;

import com.example.Book_Library_Management_System.entity.Books;
import com.example.Book_Library_Management_System.entity.ResponseStructure;
import com.example.Book_Library_Management_System.service.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/books")
public class BooksController {

    @Autowired
    private BooksService booksService;

    // Add Book
    @PostMapping("/save")
    public ResponseEntity<ResponseStructure<Books>> addBook(@RequestBody Books book) {
        return booksService.addBook(book);
    }

    // Get All Books
    @GetMapping
    public ResponseEntity<ResponseStructure<List<Books>>> getAllBooks() {
        return booksService.getAllBook();
    }

    // Get Book by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Books>> getBookById(@PathVariable int id) {
        return booksService.getBookById(id);
    }

    // Update Book by ID
    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Books>> updateBookById(@RequestBody Books book, @PathVariable int id) {
        return booksService.updateBookById(book, id);
    }

    // Delete Book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteBookById(@PathVariable int id) {
        return booksService.deleteBookById(id);
    }
}
