// src/components/Signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',  // Added retype password field
    role: 'Customer' // Default value for role
  });

  const { username, email, password, retypePassword, role } = formData;

  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== retypePassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (res.ok) {
        const data = await res.json();

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('userRole', data.userRole);
        signup(data.token, data.username, data.userId, data.userRole);
        navigate('/products');
      } else {
        const errorData = await res.json();
        console.error(errorData); // Handle errors
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        /><br />
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
        <input
          type="password"
          placeholder="Retype Password"
          name="retypePassword"
          value={retypePassword}
          onChange={handleChange}
          required
        /><br />

        {/* Role Dropdown */}
        <label>Role:</label>
        <select name="role" value={role} onChange={handleChange} required>
          <option value="Customer">Customer</option>
          <option value="StoreManager">Store Manager</option>
          <option value="Salesman">Salesman</option>
        </select><br /><br />

        <button type="submit" style={{ padding: '10px 20px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
