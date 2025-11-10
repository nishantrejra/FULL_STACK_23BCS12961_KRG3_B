import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookService from "../../services/BookService";

function AddBook() {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        author: "",
        publisher: "",
        category: "",
        isbn: "",
        publishedDate: "",
        totalCopies: "",
        availableCopies: ""
    });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure publishedDate is in correct ISO format
        if (!book.publishedDate) {
            alert("Please select a published date");
            return;
        }

        BookService.addBook(book)
            .then((res) => {
                alert(res.data?.message || "Book added successfully!");
                navigate("/");
            })
            .catch((err) => {
                console.error("Error adding book:", err);
                alert("Error adding book. Please check your input.");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                {["title", "author", "publisher", "category", "isbn"].map((field) => (
                    <div className="mb-3" key={field}>
                        <label className="form-label text-capitalize">{field}</label>
                        <input
                            type="text"
                            name={field}
                            value={book[field]}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}

                <div className="mb-3">
                    <label className="form-label">Published Date</label>
                    <input
                        type="date"
                        name="publishedDate"
                        value={book.publishedDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="row">
                    <div className="col">
                        <label className="form-label">Total Copies</label>
                        <input
                            type="number"
                            name="totalCopies"
                            value={book.totalCopies}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Available Copies</label>
                        <input
                            type="number"
                            name="availableCopies"
                            value={book.availableCopies}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                <button className="btn btn-success mt-3" type="submit">
                    Save Book
                </button>
            </form>
        </div>
    );
}

export default AddBook;
