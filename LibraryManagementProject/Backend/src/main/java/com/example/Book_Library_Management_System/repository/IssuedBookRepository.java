package com.example.Book_Library_Management_System.repository;

import com.example.Book_Library_Management_System.entity.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssuedBookRepository extends JpaRepository<IssuedBook, Integer> {
}
