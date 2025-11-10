import React, { useState } from "react";
import MemberService from "../../services/MemberService";
import { useNavigate } from "react-router-dom";

function AddMember() {
    const navigate = useNavigate();
    const [member, setMember] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Basic validations
        if (!member.email.includes("@")) {
            alert("Please enter a valid email address");
            return;
        }

        if (member.phone.length < 8) {
            alert("Phone number too short");
            return;
        }

        MemberService.addMember(member)
            .then((res) => {
                if (res.data?.message) alert(res.data.message);
                else alert("Member added successfully!");
                navigate("/members");
            })
            .catch((err) => {
                console.error("Error adding member:", err);
                if (err.response?.status === 400)
                    alert("Invalid request — check input data");
                else if (err.response?.status === 500)
                    alert("Email or Phone already exists");
                else alert("Error adding member");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Add Member</h2>
            <form onSubmit={handleSubmit}>
                {["name", "email", "phone", "address"].map((field) => (
                    <div className="mb-3" key={field}>
                        <label className="form-label text-capitalize">{field}</label>
                        <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            value={member[field]}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                <button className="btn btn-success" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddMember;
