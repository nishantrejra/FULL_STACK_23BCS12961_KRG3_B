import React from "react";
import Navbar from "./Navbar";

function Header({ username }) {
    return (
        <header style={{ background: "#282c34", padding: "15px", color: "white" }}>
            <h2>My Application</h2>
            <Navbar username={username} />
        </header>
    );
}

export default Header;
