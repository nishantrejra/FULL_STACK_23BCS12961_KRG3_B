import React from "react";

function UserProfile({ username }) {
    return (
        <div
            style={{
                background: "#ff0000ff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "10px",
            }}
        >
            <h4>User Profile</h4>
            <p><strong>Logged in as:</strong> {username}</p>
        </div>
    );
}

export default UserProfile;
