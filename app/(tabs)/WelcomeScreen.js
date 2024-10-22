import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../components/useContext.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const backgroundImage = {
  uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function WelcomeScreen() {
  const { isAuthenticated, logout } = useContext(AuthContext); 
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
        router.push('/screens/LoginScreen');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    await logout(); // Call the logout function from AuthContext
    router.push('/screens/LoginScreen'); // Redirect after logout
  };

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.container}>
      <View style={globalStyles.innerContainer}>
        {userEmail ? (
          <>
            <Text style={globalStyles.welcomeText}>Welcome to the App!</Text>
            <View>
              <Text style={globalStyles.welcomeText}>Hello, {userEmail} 👋</Text>
              <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
                <Text style={globalStyles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={globalStyles.welcomeText}>Loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
}
