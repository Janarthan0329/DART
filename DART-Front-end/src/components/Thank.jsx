
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Thank.css";

const Thank = () => {
  const navigate = useNavigate();

  return (
    <div className="form-container thank-you">
      <div className="thank-icon">🎉</div>
      <h2 className="form-title">Thank You!</h2>
      <p>Your submission has been received. Our team <br />will contact you soon.</p>
      <button style={{ cursor: 'pointer' }} className="next-button" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default Thank;