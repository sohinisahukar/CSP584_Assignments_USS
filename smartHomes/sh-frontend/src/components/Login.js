// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('userRole', data.userRole);
        login(data.token, data.username, data.userId, data.userRole);
        navigate('/products');
        
      } else {
        const errorData = await res.json();
        console.error('Error from server: ', errorData.message || 'Unknown error'); // Handle the error response
      }
    } catch (err) {
      console.error('Error during login: ', err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
