import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookService from "../../services/BookService";

function EditBook() {
    const { id } = useParams();
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

    useEffect(() => {
        BookService.getBookById(id)
            .then((res) => setBook(res.data?.data || {}))
            .catch((err) => console.error("Error loading book:", err));
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        BookService.updateBook(id, book)
            .then(() => {
                alert("Book updated successfully!");
                navigate("/");
            })
            .catch((err) => {
                console.error("Error updating book:", err);
                alert("Error updating book");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                {["title", "author", "publisher", "category", "isbn"].map((field) => (
                    <div className="mb-3" key={field}>
                        <label className="form-label text-capitalize">{field}</label>
                        <input
                            type="text"
                            name={field}
                            value={book[field] || ""}
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
                        value={book.publishedDate || ""}
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
                            value={book.totalCopies || ""}
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
                            value={book.availableCopies || ""}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                <button className="btn btn-success mt-3" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditBook;
