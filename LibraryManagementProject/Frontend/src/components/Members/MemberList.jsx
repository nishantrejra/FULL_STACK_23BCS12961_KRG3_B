import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MemberService from "../../services/MemberService";

function MemberList() {
    const [members, setMembers] = useState([]);

    const fetchMembers = () => {
        MemberService.getAllMembers()
            .then((res) => setMembers(res.data?.data || []))
            .catch((err) => console.error("Error fetching members:", err));
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            MemberService.deleteMember(id)
                .then(() => fetchMembers())
                .catch((err) => console.error("Error deleting member:", err));
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>👥 Members List</h2>
                <Link to="/add-member" className="btn btn-primary">
                    Add Member
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ? (
                        members.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.name}</td>
                                <td>{m.email}</td>
                                <td>{m.phone}</td>
                                <td>{m.address}</td>
                                <td>
                                    {/* ✏️ Edit button */}
                                    <Link
                                        to={`/edit-member/${m.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    {/* 🗑️ Delete button */}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(m.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No members found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MemberList;
