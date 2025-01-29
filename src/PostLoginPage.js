import React from "react";
import { useNavigate } from "react-router-dom";  // for navigation

function PostLoginPage() {
  const navigate = useNavigate();

  // Function to handle navigation based on option selection
  const handleOptionClick = (route) => {
    navigate(route);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, choose an option:</h2>
      <button
        onClick={() => handleOptionClick("/x")}  // Navigate to 'X' page
        style={{
          padding: "10px 20px",
          backgroundColor: "#4e8a8b",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        Option A (Navigate to X)
      </button>
      <button
        onClick={() => handleOptionClick("/y")}  // Navigate to 'Y' page
        style={{
          padding: "10px 20px",
          backgroundColor: "#4e8a8b",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        Option B (Navigate to Y)
      </button>
    </div>
  );
}

export default PostLoginPage;
