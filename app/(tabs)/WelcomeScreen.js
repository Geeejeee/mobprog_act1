import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../components/useContext.js';
import { getLoginData } from '../../storage/userDetails.js';


const backgroundImage = { uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

export default function WelcomeScreen (){
  const { isAuthenticated, logout } = useContext(AuthContext); 
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
        logout();
        router.push("/screens/LoginScreen")
      };

    return (
        <ImageBackground source={backgroundImage} style={globalStyles.container}>
         {isAuthenticated ? (
          <View style={globalStyles.innerContainer}>
            <Text style={globalStyles.welcomeText}> Welcome to the App! </Text>
              <View>
                <Text style={globalStyles.welcomeText}> ({userName} 👋) </Text>  
                <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
                  <Text style={globalStyles.logoutButtonText}> Logout </Text>
                </TouchableOpacity>
              </View> 
          </View>
            ) : (<Text style={globalStyles.welcomeText}>Not Logged In</Text>)}
        </ImageBackground>
    );
};

