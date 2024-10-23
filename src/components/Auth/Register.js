import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Form.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (res.data) {
        // Redirect to login page after successful registration
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="allFormContainer">
      <div className="formContainer">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          
          
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          
          
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>
      </div>
      <div className='imageContainer'>
        <img className="regImg" src="/assets/images/Register.png" alt='illustration' />
      </div>
    </div>
  );
};

export default Register;
