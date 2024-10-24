import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../components/useContext.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/firebase.js'; // Ensure correct path to your Firebase config

const backgroundImage = {
  uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function WelcomeScreen() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userDetails, setUserDetails] = useState(null); // User details state
  const [loading, setLoading] = useState(true); // Loading state
  const auth = getAuth(); // Firebase Auth instance

  // Fetch user data from Firestore
  const fetchUserData = async (user) => {
    try {
      if (user) {
        const docRef = doc(db, "Users", user.uid); // Reference to Firestore document
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data()); // Store user details in state
        } else {
          console.log('No user data found in Firestore.');
        }
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Monitor user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set user email on successful login
        fetchUserData(user); // Fetch user data from Firestore
      } else {
        setUserEmail(''); // Clear email on logout
        router.push('/screens/LoginScreen'); // Redirect to login screen if not authenticated
      }
      setLoading(false); // Disable loading state
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth, router]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      router.push('/screens/LoginScreen'); // Redirect to login screen after logout
    } catch (error) {
      console.error('Logout error:', error); // Handle any logout errors
    }
  };

  // Conditional rendering based on loading state and user authentication
  return (
    <ImageBackground source={backgroundImage} style={globalStyles.container}>
      <View style={globalStyles.innerContainer}>
        {loading ? (
          <Text style={globalStyles.welcomeText}>Loading...</Text>
        ) : userEmail ? (
          <>
            <Text style={globalStyles.welcomeText}>Welcome to the App!</Text>
            {userDetails && (
              <Text style={globalStyles.welcomeText}>
                Welcome, {userDetails.firstName}!
              </Text>
            )}
            <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
              <Text style={globalStyles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={globalStyles.welcomeText}>Please log in to continue.</Text>
        )}
      </View>
    </ImageBackground>
  );
}
