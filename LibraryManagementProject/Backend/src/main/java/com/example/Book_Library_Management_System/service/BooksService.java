package com.example.Book_Library_Management_System.service;

import java.util.List;
import java.util.Optional;

import com.example.Book_Library_Management_System.dao.BooksDao;
import com.example.Book_Library_Management_System.entity.Books;
import com.example.Book_Library_Management_System.entity.ResponseStructure;
import com.example.Book_Library_Management_System.exception.BooksNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



@Service
public class BooksService {

    @Autowired
    private BooksDao booksDao;

    // Add Book
    public ResponseEntity<ResponseStructure<Books>> addBook(Books book) {
        ResponseStructure<Books> structure = new ResponseStructure<>();
        structure.setData(booksDao.addBook(book));
        structure.setMessage("Book added successfully");
        structure.setStatusCode(HttpStatus.CREATED.value());

        return new ResponseEntity<>(structure, HttpStatus.CREATED);
    }

    // Get All Books
    public ResponseEntity<ResponseStructure<List<Books>>> getAllBook() {
        ResponseStructure<List<Books>> structure = new ResponseStructure<>();
        List<Books> list = booksDao.getAllBook();

        if (!list.isEmpty()) {
            structure.setMessage("Books found");
            structure.setData(list);
            structure.setStatusCode(HttpStatus.OK.value());
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }

        throw new BooksNotFoundException("No books found in the library");
    }

    // Get Book By ID
    public ResponseEntity<ResponseStructure<Books>> getBookById(int id) {
        ResponseStructure<Books> structure = new ResponseStructure<>();
        Optional<Books> found = booksDao.getBookById(id);

        if (found.isPresent()) {
            structure.setMessage("Book found for ID: " + id);
            structure.setData(found.get());
            structure.setStatusCode(HttpStatus.OK.value());
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }

        throw new BooksNotFoundException("Book not found with ID: " + id);
    }

    // Update Book By ID
    public ResponseEntity<ResponseStructure<Books>> updateBookById(Books book, int id) {
        ResponseStructure<Books> structure = new ResponseStructure<>();
        Optional<Books> exist = booksDao.getBookById(id);

        if (exist.isPresent()) {
            Books old = exist.get();

            // Update fields
            old.setTitle(book.getTitle());
            old.setAuthor(book.getAuthor());
            old.setPublisher(book.getPublisher());
            old.setIsbn(book.getIsbn());
            old.setCategory(book.getCategory());
            old.setAvailableCopies(book.getAvailableCopies());
            old.setPublishedDate(book.getPublishedDate());
            old.setTotalCopies(book.getTotalCopies());

            Books updated = booksDao.addBook(old);

            structure.setMessage("Book updated successfully");
            structure.setData(updated);
            structure.setStatusCode(HttpStatus.OK.value());

            return new ResponseEntity<>(structure, HttpStatus.OK);
        }

        throw new BooksNotFoundException("Book not found with ID: " + id);
    }

    // Delete Book By ID karne k liye
    public ResponseEntity<ResponseStructure<String>> deleteBookById(int id) {
        ResponseStructure<String> structure = new ResponseStructure<>();
        Optional<Books> exist = booksDao.getBookById(id);

        if (exist.isPresent()) {
            booksDao.deleteById(id);

            structure.setMessage("Book deleted with ID: " + id);
            structure.setData("Deleted successfully");
            structure.setStatusCode(HttpStatus.OK.value());

            return new ResponseEntity<>(structure, HttpStatus.OK);
        }

        throw new BooksNotFoundException("Book not found with ID: " + id);
    }
}
