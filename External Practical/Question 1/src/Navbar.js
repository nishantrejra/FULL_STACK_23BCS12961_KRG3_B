import React from "react";
import UserProfile from "./UserProfile";

function Navbar({ username }) {
    return (
        <nav
            style={{
                background: "#444",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px",
                color: "white"
            }}
        >
            <h3>Navigation Bar</h3>
            <UserProfile username={username} />
        </nav>
    );
}

export default Navbar;
