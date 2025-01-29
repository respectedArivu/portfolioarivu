import React from "react";
import { useNavigate } from "react-router-dom";

function OptionsPage() {
  const navigate = useNavigate();
  
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("token");

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    navigate("/login");
    return null;  // Prevent rendering the page while redirecting
  }

  const handleOptionA = () => {
    navigate("/x"); // Navigate to X page if Option A is selected
  };

  const handleOptionB = () => {
    navigate("/y"); // Navigate to Y page if Option B is selected
  };

  return (
    <section style={{
      display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", 
      background: "linear-gradient(360deg, rgba(0, 0, 0, 0.5), rgba(67, 5, 75, 0.4))"
    }}>
      <div
        className="content"
        style={{
          width: "100%", maxWidth: "500px", padding: "2rem", backgroundColor: "#fff", borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#4e8a8b", marginBottom: "20px" }}>Choose an Option</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "center" }}>
          <button
            onClick={handleOptionA}
            style={{
              padding: "10px 20px", backgroundColor: "#4e8a8b", border: "none", borderRadius: "4px", color: "#fff",
              cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s ease"
            }}
          >
            Option A
          </button>
          <button
            onClick={handleOptionB}
            style={{
              padding: "10px 20px", backgroundColor: "#4e8a8b", border: "none", borderRadius: "4px", color: "#fff",
              cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s ease"
            }}
          >
            Option B
          </button>
        </div>
      </div>
    </section>
  );
}

export default OptionsPage;
