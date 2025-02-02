import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate for routing
import { motion } from "framer-motion"; // Framer Motion for animations
import { FaEnvelope, FaLock } from "react-icons/fa"; // React Icons
import { ToastContainer, toast } from "react-toastify"; // Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styling

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://liveportbackend.onrender.com/login", { email, password });


      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);

        // Debug: Check if the navigate is being triggered
        console.log("Login successful, opening post-login page in a new tab...");

        // Open the PostLoginPage in a new tab after successful login
        window.open("/post-login", "_blank");

        // Optionally, redirect the user to home page or another page
        navigate("/");

        setMessage(response.data.message);
        toast.success(response.data.message); // Success toast
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed"); // Error toast
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(360deg, rgba(0, 0, 0, 0.5), rgba(67, 5, 75, 0.4))",
      }}
    >
      <motion.div
        className="content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#4e8a8b", marginBottom: "20px" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <FaEnvelope style={{ marginBottom: "5px" }} />
            <span style={{ color: "#333" }}>Email:</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
                marginTop: "5px",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <FaLock style={{ marginBottom: "5px" }} />
            <span style={{ color: "#333" }}>Password:</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
                marginTop: "5px",
              }}
            />
          </label>
          <motion.button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4e8a8b",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
            whileHover={{ backgroundColor: "#336c67" }}
          >
            Login
          </motion.button>
        </form>
        {message && <p style={{ color: "green", textAlign: "center", marginTop: "20px" }}>{message}</p>}
        <ToastContainer />
      </motion.div>
    </section>
  );
}

export default LoginPage;
