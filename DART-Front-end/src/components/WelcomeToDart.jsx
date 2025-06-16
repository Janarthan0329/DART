import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const WelcomeToDart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email passed from Google login
  const email = location.state?.email || "";
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleGoButtonClick = async () => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    if (!email) {
      // If not coming from Google login, redirect to the signup page
      navigate("/signup", { state: { role: selectedRole } });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/save-user-role/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: selectedRole,
        }),
      });

      if (response.ok) {
        alert("User saved successfully!");
        navigate("/"); // Redirect to the home page
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save user.");
      }
    } catch (err) {
      console.error("Error saving user:", err);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Dart!</h2>
      <p style={styles.subtitle}>To create an account, choose your role</p>
      <div style={styles.optionsContainer}>
        {email && ( // Show Username and Password fields only for Google login
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </>
          )}
        <div style={styles.option}>
          <span style={styles.icon}>🏠</span>
          <span>I'm building a house</span>
          <input
            type="radio"
            name="role"
            value="building_a_house"
            style={styles.radioButton}
            onChange={handleRoleChange}
          />
        </div>
        <div style={styles.option}>
          <span style={styles.icon}>📐</span>
          <span>I'm a quantity surveyor</span>
          <input
            type="radio"
            name="role"
            value="quantity_surveyor"
            style={styles.radioButton}
            onChange={handleRoleChange}
          />
        </div>
        <div style={styles.option}>
          <span style={styles.icon}>🛠️</span>
          <span>I'm a contractor</span>
          <input
            type="radio"
            name="role"
            value="contractor"
            style={styles.radioButton}
            onChange={handleRoleChange}
          />
        </div>
        <div style={styles.option}>
          <span style={styles.icon}>🔍</span>
          <span>Other</span>
          <input
            type="radio"
            name="role"
            value="other"
            style={styles.radioButton}
            onChange={handleRoleChange}
          />
        </div>
        <button style={styles.button} onClick={handleGoButtonClick}>
          Go
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '1px',
    color: 'black',
  },
  subtitle: {
    marginTop: '1px',
    color: 'black',
  },
  optionsContainer: {
    width: '80%',
    maxWidth: '400px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    margin: '10px 0',
    border: '3px solid Darkred',
    backgroundColor: '#f9f9f9',
    color: 'black',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '20px',
  },
  radioButton: {
    marginLeft: 'auto',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid Darkred',
    cursor: 'pointer',
  },
  button: {
    marginTop: '10px',
    marginLeft: '325px',
    padding: '10px 25px 10px 25px',
    backgroundColor: 'Darkred',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default WelcomeToDart;