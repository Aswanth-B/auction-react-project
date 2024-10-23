import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../Form.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirect to home after login
    } catch (error) {
      console.error('Error logging in', error);
      setError("Invalid Credentials");
    }
  };

  return (
    <div className='allFormContainer'>
      <div className="formContainer">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Continue</button>
          {error && <p>{error}</p>}
        </form>
      </div>
      <div className='imageContainer'>
        <img src="/assets/images/Illustration.png" alt='illustration' />
      </div>
    </div>



  );
};

export default Login;
