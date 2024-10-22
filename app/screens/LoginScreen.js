// loginScreen.js

import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { useState, useEffect, useContext, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { loginValidation } from '../../validation/loginValidation.js'; 
import { AuthContext } from '../../components/useContext.js';
import { showSuccessToast, showErrorToast } from '../../components/toast.js'; 
import { useRouter } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6IqplSEXxYVwpB7fAGq53nRvg8R1R4W0",
  authDomain: "mobprog-act1.firebaseapp.com",
  projectId: "mobprog-act1",
  storageBucket: "mobprog-act1.appspot.com",
  messagingSenderId: "658781417648",
  appId: "1:658781417648:web:61b7a7919db16a75d2cb75",
  measurementId: "G-40LEPE6QWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const backgroundImage = {
  uri: "https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function LoginScreen() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const memoizedValidationSchema = useMemo(() => loginValidation, []);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/WelcomeScreen');
    }
  }, [isAuthenticated]);

  // Handle Firebase Login
 const handleLogin = async (values) => {
  const auth = getAuth(); // Firebase Auth instance

  try {
    // Use Firebase Auth to sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, values.userNameOrEmail, values.password);

    // If sign-in is successful, log the user in
    const user = userCredential.user;
    showSuccessToast(`Welcome back, ${user.displayName || user.email}! 👋`);

    // Redirect to the Welcome screen
    router.push('/WelcomeScreen');

  } catch (error) {
    // Handle Firebase login errors and show a custom toast message
    if (error.code === 'auth/user-not-found') {
      showErrorToast('User not found. Please check your email or sign up.');
    } else if (error.code === 'auth/wrong-password') {
      showErrorToast('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      showErrorToast('Invalid email format. Please check your email.');
    } else {
      showErrorToast('Login failed. Please try again later.');
    }

    // You can log the error for debugging if needed
    console.error('Firebase login error:', error.message);
  }
};


  return (
    <ImageBackground source={backgroundImage} style={globalStyles.container}>
     {isAuthenticated ? (  
      <View>
      <Text style={globalStyles.title}>Already Logged In!</Text>
      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/WelcomeScreen')} // Navigate directly on press
      >
        <Text style={globalStyles.buttonText}>Go back</Text>
      </TouchableOpacity>
      </View>
    ) :(
      <View>
        <Text style={globalStyles.title}>Login</Text>
   
      
      <View style={globalStyles.form}>
        <Formik
          initialValues={{ userNameOrEmail: '', password: '' }}
          validationSchema={memoizedValidationSchema} // Apply validation
          onSubmit={(values) => handleLogin(values)} // Handle login
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={globalStyles.inputLabel}>Username or Email</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Username or Email"
                placeholderTextColor="#aaa"
                value={values.userNameOrEmail}
                onChangeText={handleChange("userNameOrEmail")}
                onBlur={handleBlur("userNameOrEmail")}
              />
              {errors.userNameOrEmail && touched.userNameOrEmail && (
                <Text style={globalStyles.errorText}>
                  {errors.userNameOrEmail}
                </Text>
              )}

              <Text style={globalStyles.inputLabel}> {"\n"} Password</Text>
              <View>
                <TextInput
                  style={globalStyles.inputWithIcon}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!isPasswordVisible}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={globalStyles.eyeIcon}
                >
                  <Icon
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={globalStyles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={globalStyles.button}
                onPress={handleSubmit}
              >
                <Text style={globalStyles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text style={globalStyles.signuptext}>
                Don't have an account?{" "}
                <Text
                  style={globalStyles.signuptext2}
                  onPress={() => router.push("/screens/SignupScreen")}
                >
                  Sign up!
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </View>
      </View>
      )}
    </ImageBackground>
  );
}
