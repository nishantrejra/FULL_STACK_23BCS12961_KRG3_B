import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookService from "../../services/BookService";

function BookList() {
    const [books, setBooks] = useState([]);

    const fetchBooks = () => {
        BookService.getAllBooks()
            .then((res) => setBooks(res.data?.data || []))
            .catch((err) => console.error("Error fetching books:", err));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            BookService.deleteBook(id)
                .then(() => fetchBooks())
                .catch((err) => console.error("Error deleting book:", err));
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>📚 Books List</h2>
                <Link to="/add-book" className="btn btn-primary">
                    Add Book
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Category</th>
                        <th>ISBN</th>
                        <th>Published Date</th>
                        <th>Total Copies</th>
                        <th>Available Copies</th>
                        <th style={{ width: "160px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((b) => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.publisher}</td>
                                <td>{b.category}</td>
                                <td>{b.isbn}</td>
                                <td>{b.publishedDate}</td>
                                <td>{b.totalCopies}</td>
                                <td>{b.availableCopies}</td>
                                <td>
                                    {/* 🟡 Edit button added here */}
                                    <Link
                                        to={`/edit-book/${b.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    {/* 🔴 Delete button */}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(b.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">
                                No books found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
