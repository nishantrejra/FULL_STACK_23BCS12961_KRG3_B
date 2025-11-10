package com.example.Book_Library_Management_System.dao;

import java.util.List;
import java.util.Optional;

import com.example.Book_Library_Management_System.entity.Books;
import com.example.Book_Library_Management_System.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BooksDao {

    @Autowired
    private BooksRepository booksRepository;

    // Add Book
    public Books addBook(Books book) {
        return booksRepository.save(book);
    }

    // Get All Books
    public List<Books> getAllBook() {
        return booksRepository.findAll();
    }

    // Get Book by ID
    public Optional<Books> getBookById(int id) {
        return booksRepository.findById(id);
    }

    // Update Book
    public Books updateBookById(Books book) {
        return booksRepository.save(book);
    }

    // Delete Book by ID
    public boolean deleteById(int id) {
        Optional<Books> recBook = getBookById(id);
        if (recBook.isPresent()) {
            booksRepository.delete(recBook.get());
            return true;
        }
        return false;
    }
}
