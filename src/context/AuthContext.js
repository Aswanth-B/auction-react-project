import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
        try {
            // Decode token to check expiry
            const decodedToken = jwtDecode(token);
            // Check if token is expired
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                // Token expired, log the user out
                logout();
            } else {
                // Token is valid, set user as authenticated
                setIsAuthenticated(true);
                setUserName(decodedToken.email.split('@')[0]);
            }
        } catch (error) {
            console.error('Invalid token:', error);
            logout();
        }
    }
    setLoading(false);
}, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setIsAuthenticated(true);
    setUserName(email.split('@')[0]);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
