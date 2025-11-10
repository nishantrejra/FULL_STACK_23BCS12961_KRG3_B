package com.example.Book_Library_Management_System.dao;

import com.example.Book_Library_Management_System.entity.IssuedBook;
import com.example.Book_Library_Management_System.repository.IssuedBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class IssuedBookDao {

    @Autowired
    private IssuedBookRepository issuedBookRepository;

    public IssuedBook saveIssuedBook(IssuedBook issuedBook) {
        return issuedBookRepository.save(issuedBook);
    }

    public List<IssuedBook> getAllIssuedBooks() {
        return issuedBookRepository.findAll();
    }

    public Optional<IssuedBook> getIssuedBookById(int id) {
        return issuedBookRepository.findById(id);
    }

    public boolean deleteIssuedBookById(int id) {
        Optional<IssuedBook> issuedBook = getIssuedBookById(id);
        if (issuedBook.isPresent()) {
            issuedBookRepository.delete(issuedBook.get());
            return true;
        }
        return false;
    }
}
