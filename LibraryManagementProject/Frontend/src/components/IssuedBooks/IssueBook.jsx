import React, { useEffect, useState } from "react";
import IssuedBookService from "../../services/IssuedBookService";
import BookService from "../../services/BookService";
import MemberService from "../../services/MemberService";
import { useNavigate } from "react-router-dom";

function IssueBook() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");
    const [selectedMember, setSelectedMember] = useState("");

    useEffect(() => {
        BookService.getAllBooks()
            .then(res => setBooks(res.data?.data || []))
            .catch(err => console.error("Error fetching books:", err));

        MemberService.getAllMembers()
            .then(res => setMembers(res.data?.data || []))
            .catch(err => console.error("Error fetching members:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedBook || !selectedMember) {
            alert("Please select both book and member!");
            return;
        }

        IssuedBookService.issueBook(selectedBook, selectedMember)
            .then(() => {
                alert("Book issued successfully!");
                navigate("/issued-books");
            })
            .catch(err => {
                console.error("Error issuing book:", err);
                alert("Error issuing book. Check if book or member exists.");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Issue a Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select Book</label>
                    <select
                        className="form-select"
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                        required
                    >
                        <option value="">-- Select Book --</option>
                        {books.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Select Member</label>
                    <select
                        className="form-select"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                        required
                    >
                        <option value="">-- Select Member --</option>
                        {members.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success">
                    Issue Book
                </button>
            </form>
        </div>
    );
}

export default IssueBook;
