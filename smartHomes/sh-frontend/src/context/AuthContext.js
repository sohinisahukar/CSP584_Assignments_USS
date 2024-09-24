import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider to wrap the components that need access to the authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');

    // If token and user info exist, set user and login status
    if (token && username && userId && userRole) {
      setIsLoggedIn(true);
      setUser({ token, username, userId, userRole });
    }
  }, []);

  const signup = (token, username, userId, userRole) => {
    // Save to sessionStorage
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userRole', userRole);
    
    // Set user in state
    setIsLoggedIn(true);
    setUser({ token, username, userId, userRole });
  };

  const login = (token, username, userId, userRole) => {
    // Save to sessionStorage
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userRole', userRole);
    
    // Set user in state
    setIsLoggedIn(true);
    setUser({ token, username, userId, userRole });
  };

  const logout = () => {
    sessionStorage.clear(); // Clear all session data
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
