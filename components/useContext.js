import React, { createContext, useState } from 'react';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth'; // Import signOut

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const auth = getAuth();

  const logout = async () => {
    try {
      await firebaseSignOut(auth); // Use Firebase's signOut
      setIsAuthenticated(false); // Update local state
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
