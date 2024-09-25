import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../app/LoginScreen'; // Login page
import SignupScreen from '../app/SignupScreen'; // Signup page
import WelcomeScreen from '../app/WelcomeScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
