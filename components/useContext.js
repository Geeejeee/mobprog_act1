import React, { createContext, useState, useEffect } from 'react';
import { getLoginData } from '../storage/userDetails';  // AsyncStorage functions

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in the user
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to log out the user
  const logout = async () => {
    setIsAuthenticated(false);
  };

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await getLoginData();
      if (userData) {
        setIsAuthenticated(true);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
