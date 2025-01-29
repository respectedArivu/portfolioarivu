import React, { useState } from "react";
import "./App.css";
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope } from "react-icons/fa"; // Icons import
import axios from "axios"; // Import axios for API requests
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import Router and Link for navigation
import RegisterPage from "./RegisterPage"; // Import RegisterPage
import LoginPage from "./LoginPage"; // Import LoginPage
import { HashLink } from 'react-router-hash-link'; 
import XPage from "./XPage"; // Page X
import YPage from "./YPage"; 
import PostLoginPage from "./PostLoginPage";
import HomePage from './HomePage'; // Add this import

function App() {
  const [callbackFormData, setCallbackFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
    preferredTime: "", // Added preferredTime to the form
  });
  const [message, setMessage] = useState("");  // Remove the duplicate state declaration for message
  const [fetchData, setFetchData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const isAuthenticated = false; // Set your authentication status here

  // Handle form input changes for the callback form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCallbackFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form input changes for the fetch details form
  const handleFetchChange = (e) => {
    const { name, value } = e.target;
    setFetchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle callback form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/request-callback", callbackFormData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("There was an error submitting your request.");
    }
  };

  // Handle fetch request details
  const handleFetchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:5000/fetch-request", {
        params: { name: fetchData.name, phoneNumber: fetchData.phoneNumber }
      });
      setFetchedDetails(response.data);
    } catch (error) {
      setFetchedDetails(null);
      setMessage("No details found for the given name and phone number.");
    }
  };

  return (
    <Router> {/* Only keep one Router component */}
      <div className="App dark-theme">
        <header className="App-header big-header">
          <div className="header-content">
            <h1>Arivnandhan Chitheswaran</h1>
            <nav>
              <ul>
                {/* HashLink navigation */}
                <li><HashLink to="#Homepage"><FaHome className="nav-icon" /> Home</HashLink></li>
                <li><HashLink to="#skills"><FaCode className="nav-icon" /> Skills</HashLink></li>
                <li><HashLink to="#projects"><FaProjectDiagram className="nav-icon" /> Projects & Experience</HashLink></li>
                <li><HashLink to="#contact"><FaEnvelope className="nav-icon" /> Contact</HashLink></li>
                {isAuthenticated && (
                  <li><Link to="/post-login"><FaUser className="nav-icon" /> Post Login</Link></li>
                )}
                <li><Link to="/register"><FaUser className="nav-icon" /> Register</Link></li>
                <li><Link to="/login"><FaUser className="nav-icon" /> Login</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post-login" element={<PostLoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Add other routes as needed */}
        </Routes>

        <section id="home" className="section" style={{ position: 'relative', overflow: 'hidden', height: '50vh' }}>
          <div className="hero" style={{ position: 'relative', zIndex: 10 }}>
            <h1>Stay tuned...</h1>
            <p>Page under construction - Jan 2025</p>
            <p>Service Desk | Development | Website Management</p>
          </div>
          <video 
            autoPlay 
            muted 
            loop 
            style={{
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              zIndex: -1,
            }}
          >
            <source src={`${process.env.PUBLIC_URL}/bgrob.mp4`} type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
            zIndex: 1
          }}></div>
        </section>

        {/* Request Callback Section */}
        <section id="callback" className="section">
          <div className="content">
            <h2>Request a Callback</h2>
            <form onSubmit={handleSubmit} className="callback-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={callbackFormData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={callbackFormData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={callbackFormData.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Message:
                <textarea
                  name="message"
                  value={callbackFormData.message}
                  onChange={handleChange}
                />
              </label>

              <label>
                Preferred Time Slot:
                <input
                  type="text"
                  name="preferredTime"
                  value={callbackFormData.preferredTime}
                  onChange={handleChange}
                  placeholder="Enter your preferred time"
                />
              </label>

              <button type="submit">Submit Request</button>
            </form>

            {message && <p>{message}</p>}
          </div>
        </section>

        {/* Fetch Details Section */}
        <section id="fetch-details" className="section">
          <div className="content">
            <h2>Fetch My Details</h2>
            <form onSubmit={handleFetchSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={fetchData.name}
                  onChange={handleFetchChange}
                  required
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={fetchData.phoneNumber}
                  onChange={handleFetchChange}
                  required
                />
              </label>

              <button type="submit">Fetch Details</button>
            </form>

            {fetchedDetails && (
              <div>
                <h3>Details Found:</h3>
                <p>Name: {fetchedDetails.name}</p>
                <p>Phone: {fetchedDetails.phoneNumber}</p>
                <p>Email: {fetchedDetails.email}</p>
                <p>Message: {fetchedDetails.message}</p>
                <p>Preferred Time Slot: {fetchedDetails.preferredTime}</p>
              </div>
            )}

            {message && <p>{message}</p>}
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="content">
            <h2 className="skills-title">Skills</h2>
            <div className="skills-cards">
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <h3>New Relic</h3>
                  </div>
                  <div className="card-back">
                    <p>Setting up monitors, analyzing performance, and creating dashboards.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <h3>Jira</h3>
                  </div>
                  <div className="card-back">
                    <p>Workflow management, issue tracking, and ITSM best practices.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <h3>ReactJS</h3>
                  </div>
                  <div className="card-back">
                    <p>Developing dynamic web applications with component-based architecture.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <h3>Client Communication</h3>
                  </div>
                  <div className="card-back">
                    <p>Acting as a bridge between technical teams and clients to ensure seamless communication.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="content">
            <h2>Projects & Experience</h2>
            <div className="project-list">
              <div className="project-item">
                <h3>Blockbuster Style Website</h3>
                <p>
                  Developed and deployed a responsive website using ReactJS for Blockbuster Style Pvt. Ltd., hosted on GoDaddy.
                </p>
              </div>
              <div className="project-item">
                <h3>Service Desk Optimization</h3>
                <p>
                  Enhanced incident management workflows and SLA compliance using Jira, ensuring improved task resolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="content">
            <h2>Contact</h2>
            <p>Email: arivnandhan@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
