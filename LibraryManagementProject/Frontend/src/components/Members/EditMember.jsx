import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemberService from "../../services/MemberService";

function EditMember() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        MemberService.getAllMembers()
            .then((res) => {
                const found = res.data.data.find((m) => m.id === parseInt(id));
                if (found) setMember(found);
            })
            .catch((err) => console.error("Error loading member:", err));
    }, [id]);

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        MemberService.updateMember(id, member)
            .then(() => {
                alert("Member updated successfully!");
                navigate("/members");
            })
            .catch((err) => {
                console.error("Error updating member:", err);
                alert("Error updating member");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Edit Member</h2>
            <form onSubmit={handleSubmit}>
                {["name", "email", "phone", "address"].map((field) => (
                    <div className="mb-3" key={field}>
                        <label className="form-label text-capitalize">{field}</label>
                        <input
                            type="text"
                            name={field}
                            value={member[field] || ""}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                <button className="btn btn-success" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditMember;
