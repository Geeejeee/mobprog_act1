import { Text, View, TextInput, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const backgroundImage = { uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

export default function LoginScreen({navigation}) {
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const showToast = () => {
    if (Username) {
      Toast.show({
        type: 'success',
        text1: 'Logined Successfully!',
        text2: `Welcome, ${Username}! 👋`
      });
      // Clear inputs after successful login
      setUsername("");
      setPassword("");
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  
  return (    
    <ImageBackground
      source={backgroundImage}
      style={globalStyles.container}
    >
    <View>
    <Text style={globalStyles.title}>Login</Text>
    </View>
    
      <View style={globalStyles.form}>
      <Text style={globalStyles.inputLabel}>Username</Text>
        <TextInput
          style = {globalStyles.input}
          placeholder = "Username"
          placeholderTextColor = "#aaa"
          value={Username}
          onChangeText={setUsername}
          />

<Text style={globalStyles.inputLabel}>Password</Text>
        <View style={globalStyles.passwordContainer}>
          <TextInput
            style={globalStyles.inputWithIcon} // Style for TextInput with icon
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            value={Password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={globalStyles.eyeIcon}>
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={globalStyles.button} onPress={showToast}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={globalStyles.signuptext}>Don't have an account? 
        <Text style={globalStyles.signuptext2} onPress={() => navigation.navigate("Signup")}> Sign up! </Text>
        </Text>

      </View>
    </ImageBackground>
  );
}
