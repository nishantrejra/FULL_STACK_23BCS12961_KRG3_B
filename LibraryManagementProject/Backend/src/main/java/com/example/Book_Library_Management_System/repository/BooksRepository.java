package com.example.Book_Library_Management_System.repository;
import com.example.Book_Library_Management_System.entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BooksRepository extends JpaRepository<Books, Integer> {

}

