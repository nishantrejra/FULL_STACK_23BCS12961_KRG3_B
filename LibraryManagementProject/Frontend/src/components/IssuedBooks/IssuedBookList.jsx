import React, { useEffect, useState } from "react";
import IssuedBookService from "../../services/IssuedBookService";
import { Link } from "react-router-dom";

function IssuedBookList() {
    const [issuedBooks, setIssuedBooks] = useState([]);

    const fetchIssuedBooks = () => {
        IssuedBookService.getAllIssuedBooks()
            .then(res => setIssuedBooks(res.data?.data || []))
            .catch(err => console.error("Error fetching issued books:", err));
    };

    useEffect(() => {
        fetchIssuedBooks();
    }, []);

    const handleReturn = (id) => {
        if (window.confirm("Confirm return for this book?")) {
            IssuedBookService.returnBook(id)
                .then(() => {
                    alert("Book returned successfully!");
                    fetchIssuedBooks();
                })
                .catch(err => {
                    console.error("Error returning book:", err);
                    alert("Error returning book");
                });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this issued record?")) {
            IssuedBookService.deleteIssuedBook(id)
                .then(() => fetchIssuedBooks())
                .catch(err => console.error("Error deleting issued record:", err));
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>📘 Issued Books</h2>
                <Link to="/issue-book" className="btn btn-primary">
                    Issue Book
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Book Title</th>
                        <th>Member Name</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {issuedBooks.length > 0 ? (
                        issuedBooks.map((i) => (
                            <tr key={i.id}>
                                <td>{i.id}</td>
                                <td>{i.book?.title}</td>
                                <td>{i.member?.name}</td>
                                <td>{i.issueDate}</td>
                                <td>{i.returnDate ? i.returnDate : "Not Returned"}</td>
                                <td>
                                    {!i.returnDate && (
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => handleReturn(i.id)}
                                        >
                                            Return
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(i.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No issued books found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default IssuedBookList;
