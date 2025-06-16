import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "./userform.css";
import { FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleSelect = () => {
    navigate("/signup");
  };

  const handleNavigateToWelcome = () => {
    navigate("/welcome");
  };

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State for error messages
  const [error, setError] = useState("");

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [rememberMe, setRememberMe] = useState(false);


  // Handle form submission
  const handleLogin = async () => {
    const { username, password } = formData;

    // Basic validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      // Send login request to the backend
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();

        // Store user session based on "Remember me" checkbox
        if (rememberMe) {
          localStorage.setItem("userEmail", result.email);
        } else {
          sessionStorage.setItem("userEmail", result.email);
        }

        // localStorage.setItem("userEmail", result.email);
        alert(result.message || "Login successful!");

        // Redirect based on the state passed from HeroSection
        const redirectTo = location.state?.redirectTo || "/";
        if (redirectTo === "HeroSection") {
          navigate("/");
        } else {
          navigate("/userform");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid credentials. Please try again.");
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
      setIsModalOpen(true);
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setError(""); // Clear the error message
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
              <h1 className="dart">Login</h1>
            </center>
            <center>
              <p className="dart-subtext">
                Welcome back. Enter your credentials to access your account
              </p>
            </center>
            <div className="dart-input-list">
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
                <FaLock className="dart-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="dart-forgot-password">Forgot password?</div>
            </div>

            {/* Display error message */}
            {error && <p className="error-message">{error}</p>}

            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="dart-button-group">
              <button
                className="dart-secondary-button"
                onClick={handleLogin}
              >
                <center>Login</center>
              </button>
            </div>
            <br />
            <div className="dart-or-separator">Or Login with</div>
            <div className="separator">
              <>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const token = credentialResponse.credential;
                      const decodedToken = jwtDecode(token);

                      // Send the token to the backend to check user existence
                      const response = await fetch("http://127.0.0.1:8000/google-login/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                      });

                      if (response.ok) {
                        const result = await response.json();

                        if (result.isNewUser) {
                          // Redirect new users to WelcomeToDart page to select a role
                          navigate("/welcome", { state: { email: decodedToken.email } });
                        } else {
                          // Log in existing users and redirect to the home page
                          localStorage.setItem("userEmail", decodedToken.email);
                          alert("Login successful!");
                          navigate("/");
                        }
                      } else {
                        const errorData = await response.json();
                        setError(errorData.error || "Google login failed.");
                      }
                    } catch (err) {
                      console.error("Error during Google login:", err);
                      setError("An error occurred. Please try again.");
                    }
                  }}
                  onError={() => setError("Google login failed.")}
                  auto_select={true}
                />
              </>
              <span className="apple-icon">
                <FaApple size={24} />
              </span>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="dart-right-pane">
          <div className="dart-login-prompt">
            <p className="account">
              Already have an<br></br> account?
            </p>
            <div className="">
              <button className="button" onClick={handleNavigateToWelcome}>
                Signup
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for displaying errors */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{error}</p>
            <button className="modal-close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
