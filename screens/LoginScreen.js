import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { loginValidation } from '../validation/loginValidation'; // Import validation schema
import { getLoginData } from '../storage/userDetails'; // Import AsyncStorage helper
import { showSuccessToast, showErrorToast } from '../components/toast.js'; // Import toast functions

const backgroundImage = { uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

export default function LoginScreen({ navigation }) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleLogin = async (values) => {
    const storedUser = await getLoginData();
    if (storedUser && (storedUser.email === values.userNameOrEmail || storedUser.userName === values.userNameOrEmail) && storedUser.password === values.password) {
      showSuccessToast(`Welcome, ${storedUser.firstName}! 👋`);
      navigation.navigate('Welcome');
      } else {
      showErrorToast('Incorrect username/email or password');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.container}>
      <View>
        <Text style={globalStyles.title}>Login</Text>
      </View>

      <View style={globalStyles.form}>
        <Formik
          initialValues={{ userNameOrEmail: '', password: '' }}
          validationSchema={loginValidation} // Apply validation
          onSubmit={(values) => handleLogin(values)} // Handle login
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={globalStyles.inputLabel}>Username or Email</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Username or Email"
                placeholderTextColor="#aaa"
                value={values.userNameOrEmail}
                onChangeText={handleChange('userNameOrEmail')}
                onBlur={handleBlur('userNameOrEmail')}
              />
              {errors.userNameOrEmail && touched.userNameOrEmail && (
                <Text style={globalStyles.errorText}>{errors.userNameOrEmail}</Text>
              )}

              <Text style={globalStyles.inputLabel}> {'\n'} Password</Text>
              <View>
                <TextInput
                  style={globalStyles.inputWithIcon}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!isPasswordVisible}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={globalStyles.eyeIcon}>
                  <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#aaa" />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={globalStyles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text style={globalStyles.signuptext}>
                Don't have an account?{' '}
                <Text style={globalStyles.signuptext2} onPress={() => navigation.navigate('Signup')}>
                  Sign up!
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
}
