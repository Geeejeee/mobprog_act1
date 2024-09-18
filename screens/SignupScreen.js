import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const backgroundImage = { uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

export default function SignupScreen({ navigation }) {
  const [Firstname, setFname] = useState("");
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleRegister = () => {
    if (Firstname && Email && Username && Password) {
      // Clear input fields
      setFname("");
      setEmail("");
      setUsername("");
      setPassword("");

      // Navigate to login screen after successful registration
      navigation.navigate('Login');

      // Show toast message on the login screen
      Toast.show({
        type: 'success',
        text1: 'Registered Successfully!',
        text2: `Welcome, ${Firstname}! 👋`
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Please fill out all the fields'
      });
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={globalStyles.container}
    >
      <View>
        <Text style={globalStyles.title}>Sign Up</Text>
      </View>
      
      <View style={globalStyles.form}>
        <Text style={globalStyles.inputLabel}>First Name</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="First Name"
          placeholderTextColor="#aaa"
          value={Firstname}
          onChangeText={setFname}
        />

        <Text style={globalStyles.inputLabel}>Email</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={Email}
          onChangeText={setEmail}
        />

        <Text style={globalStyles.inputLabel}>Username</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
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
        
        <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
          <Text style={globalStyles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={globalStyles.signuptext}>Have an Account?
          <Text style={globalStyles.signuptext2} onPress={() => navigation.navigate("Login")}> Login! </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}
