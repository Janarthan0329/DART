import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import { GrLanguage } from "react-icons/gr";


const HeroSection = () => {
  const navigate = useNavigate();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigateTologin = () => {
    // Pass a state to indicate redirection to HeroSection after login
    navigate("/login", { state: { redirectTo: "HeroSection" } });
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    alert("You have been logged out.");
    navigate("/");
  };

  const handleCreateBOQ = () => {
    if (isLoggedIn) {
      navigate("/userform");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <nav className="topline">
          <div className="topline-content">
            Accurate BOQs, no manual calculations: Simply cost estimation
            effortlessly.
          </div>
        </nav>
        <div className="nav-content">
          <div>
            <span>
              <img
                src="src/assets/DART (2).png"
                alt="DART Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </span>
          </div>

          <div className="nav-items">
            <div className="center-nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#contact" className="nav-link">Contact Us</a>
            </div>
            <div>
              <div className="right-buttons">
                <button className="container">
                  <GrLanguage /> EN
                </button>
                {isLoggedIn ? (
                  <button className="login-button" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <button className="login-button" onClick={handleNavigateTologin}>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        {/* Left Section  */}
        <section className="left-section">
          <div className="hero-content">
            <h1 className="main-heading">
              Generate Accurate
              <br /> BOQs for Your <br />
              Home Plans with
              <br /> Ease
            </h1>
            <p className="sub-text">
              Struggling with manual cost estimation? Our <br /> platform quickly
              generates accurate BOQs  <br />from your CAD designs, making the process <br />
              effortless, efficient, and reliable—so you can  <br />focus on building
              with confidence.
            </p>
            <p className="cta-text">Start planning smarter today!</p>
            <div className="button-group">
              <button className="primary-button">Start a free trial</button>
              <button className="secondary-button" onClick={handleCreateBOQ}>
                Create BOQ
              </button>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="right-section">
          <div className="">
            <img
              src="images/1.png"
              alt=" "
              className="boq-image"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
