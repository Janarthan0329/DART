import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./signup.css";
import { FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: location.state?.role || "other", // Get role from WelcomeToDart or default to "other"
  });

  // State for error messages
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSignup = async () => {
    const { username, email, password, confirmPassword, role } = formData;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send data to the backend
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }), 
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Signup successful!");
        navigate("/login"); 
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="dart-signup-container">
      <div className="dart-signup-wrapper">
        {/* Left Section */}
        <section className="dart-left-pane">
          <div className="dart-form-section">
            <center>
              <img
                src="src/assets/DART (2).png"
                alt="DART Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </center>
            <center>
              <h1 className="dart">Signup</h1>
            </center>
            <center>
              <p className="dart-subtext">
                Welcome! Enter your credentials to create your account
              </p>
            </center>

            <div className="dart-input-list dart-form-section">
              <div className="dart-input-field">
                <FaUser className="dart-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="dart-input-field">
                <FaEnvelope className="dart-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="dart-input-field">
                <FaLock className="dart-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="dart-input-field">
                <FaCheck className="dart-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="dart-button-group">
              <button
                className="dart-secondary-button dart-form-section img"
                onClick={handleSignup}
              >
                <center>Signup</center>
              </button>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="dart-right-pane">
          <div className="dart-login-prompt">
            <p className="account">
              Already have an
              <br />
              account?
            </p>
            <div className="dart-button-group">
              <button
                className="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;