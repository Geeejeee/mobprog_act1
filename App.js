import React from 'react';
import AppNavigation from './navigation/appNavigation'; // Import navigation setup
import ToastNotification from './components/toast';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
};

export default App;