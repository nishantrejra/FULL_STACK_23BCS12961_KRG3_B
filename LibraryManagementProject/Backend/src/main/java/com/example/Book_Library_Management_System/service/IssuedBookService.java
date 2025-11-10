package com.example.Book_Library_Management_System.service;

import com.example.Book_Library_Management_System.dao.BooksDao;
import com.example.Book_Library_Management_System.dao.IssuedBookDao;
import com.example.Book_Library_Management_System.dao.MemberDao;
import com.example.Book_Library_Management_System.entity.Books;
import com.example.Book_Library_Management_System.entity.IssuedBook;
import com.example.Book_Library_Management_System.entity.Member;
import com.example.Book_Library_Management_System.entity.ResponseStructure;
import com.example.Book_Library_Management_System.exception.BookNotAvailableException;
import com.example.Book_Library_Management_System.exception.IssuedBookNotFoundException;
import com.example.Book_Library_Management_System.exception.MemberNotFoundException;
import com.example.Book_Library_Management_System.exception.BooksNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class IssuedBookService {

    @Autowired
    private IssuedBookDao issuedBookDao;

    @Autowired
    private BooksDao booksDao;

    @Autowired
    private MemberDao memberDao;

    // Issue a book karne k liye
    public ResponseEntity<ResponseStructure<IssuedBook>> issueBook(int bookId, int memberId) {
        Optional<Books> bookOpt = booksDao.getBookById(bookId);
        Optional<Member> memberOpt = memberDao.getMemberById(memberId);

        if (bookOpt.isEmpty()) throw new BooksNotFoundException("Book not found with ID: " + bookId);
        if (memberOpt.isEmpty()) throw new MemberNotFoundException("Member not found with ID: " + memberId);

        Books book = bookOpt.get();
        Member member = memberOpt.get();

        if (book.getAvailableCopies() <= 0)
            throw new BookNotAvailableException("No available copies for book ID: " + bookId);

        // Reduce available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        booksDao.addBook(book);

        IssuedBook issuedBook = new IssuedBook();
        issuedBook.setBook(book);
        issuedBook.setMember(member);
        issuedBook.setIssueDate(LocalDate.now());
        issuedBook.setStatus("Issued");

        ResponseStructure<IssuedBook> structure = new ResponseStructure<>();
        structure.setData(issuedBookDao.saveIssuedBook(issuedBook));
        structure.setMessage("Book issued successfully to member: " + member.getName());
        structure.setStatusCode(HttpStatus.CREATED.value());

        return new ResponseEntity<>(structure, HttpStatus.CREATED);
    }

    // Return a book karne k liye
    public ResponseEntity<ResponseStructure<IssuedBook>> returnBook(int issuedBookId) {
        Optional<IssuedBook> issueOpt = issuedBookDao.getIssuedBookById(issuedBookId);

        if (issueOpt.isEmpty()) throw new IssuedBookNotFoundException("Issued record not found with ID: " + issuedBookId);

        IssuedBook issue = issueOpt.get();

        if (!"Issued".equalsIgnoreCase(issue.getStatus()))
            throw new RuntimeException("This book is already returned!");

        // Update return details
        issue.setStatus("Returned");
        issue.setReturnDate(LocalDate.now());

        // Increase available copies karne k liye
        Books book = issue.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        booksDao.addBook(book);

        ResponseStructure<IssuedBook> structure = new ResponseStructure<>();
        structure.setData(issuedBookDao.saveIssuedBook(issue));
        structure.setMessage("Book returned successfully");
        structure.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(structure, HttpStatus.OK);
    }

    // Get all issued books
    public ResponseEntity<ResponseStructure<List<IssuedBook>>> getAllIssuedBooks() {
        List<IssuedBook> list = issuedBookDao.getAllIssuedBooks();
        if (!list.isEmpty()) {
            ResponseStructure<List<IssuedBook>> structure = new ResponseStructure<>("Issued books found", HttpStatus.OK.value(), list);
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }
        throw new IssuedBookNotFoundException("No issued books found");
    }

    // Delete issued record karne k liye
    public ResponseEntity<ResponseStructure<String>> deleteIssuedBookById(int id) {
        if (issuedBookDao.deleteIssuedBookById(id)) {
            ResponseStructure<String> structure = new ResponseStructure<>("Issued record deleted", HttpStatus.OK.value(), "Deleted");
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }
        throw new IssuedBookNotFoundException("Issued record not found with ID: " + id);
    }
}
