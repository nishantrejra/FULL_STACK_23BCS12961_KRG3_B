import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/Books/BookList";
import AddBook from "./components/Books/AddBook";
import MemberList from "./components/Members/MemberList";
import AddMember from "./components/Members/AddMember";
import IssuedBookList from "./components/IssuedBooks/IssuedBookList";
import IssueBook from "./components/IssuedBooks/IssueBook";
// ✅ Add these two new imports
import EditBook from "./components/Books/EditBook";
import EditMember from "./components/Members/EditMember";
import Login from "./components/Auth/Login";



// Simple Navbar CSS
const navbarStyle = {
  backgroundColor: "#222",
  padding: "10px 0",
};

const linkStyle = {
  color: "white",
  marginLeft: "15px",
  textDecoration: "none",
  fontSize: "16px",
};

const brandStyle = {
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
};



function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Library Management</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item"><Link to="/books" className="nav-link">Books</Link></li>
              <li className="nav-item"><Link to="/add-book" className="nav-link">Add Book</Link></li>
              <li className="nav-item"><Link to="/members" className="nav-link">Members</Link></li>
              <li className="nav-item"><Link to="/add-member" className="nav-link">Add Member</Link></li>

              <li className="nav-item">
                <Link to="/issued-books" className="nav-link">Issued Books</Link>
              </li>
              <li className="nav-item">
                <Link to="/issue-book" className="nav-link">Issue Book</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/add-member" element={<AddMember />} />

          {/* Issued Books */}
          <Route path="/issued-books" element={<IssuedBookList />} />
          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/edit-member/:id" element={<EditMember />} />
          

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
