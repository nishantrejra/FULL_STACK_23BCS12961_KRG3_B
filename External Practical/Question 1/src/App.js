import React from "react";
import Header from "./Header";

function App() {
  const username = "Nishant Rejra";

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <Header username={username} />
    </div>
  );
}

export default App;
