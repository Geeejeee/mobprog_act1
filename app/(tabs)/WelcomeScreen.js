import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { useRouter } from 'expo-router';
import { getLoginData, setLoggedIn } from '../../storage/userDetails.js';


const backgroundImage = { uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

export default function WelcomeScreen (){
    const router = useRouter()
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          const storedUser = await getLoginData();
          if (storedUser) {
            setUserName(storedUser.firstName);
          }
        };
    
        fetchUserData(); 
      }, []);
    
      const handleLogout = async () => {
        try {
          await setLoggedIn(false);
          router.push('/screens/LoginScreen');     
        } catch (error) {
          console.error('Error during logout', error);
        }
      };

    return (
        <ImageBackground source={backgroundImage} style={globalStyles.container}>
        <View style={globalStyles.innerContainer}>
            <Text style={globalStyles.welcomeText}> Welcome to the App! </Text>
            <Text style={globalStyles.welcomeText}> ({userName} 👋) </Text>  
            <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
                <Text style={globalStyles.logoutButtonText}> Logout </Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

