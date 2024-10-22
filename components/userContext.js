import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false, username: "" });

  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ 
          isLoggedIn: true, 
          username: currentUser.displayName || currentUser.email 
        });
      } else {
        setUser({ isLoggedIn: false, username: "" });
      }
    });

    // Cleanup the subscription on unmount
    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser({ isLoggedIn: false, username: "" });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
