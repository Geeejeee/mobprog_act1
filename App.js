import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './components/useContext'; // Adjust path as necessary
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const App = () => {
  const { user } = useContext(AuthContext); // Get the user from context

  return (
    <NavigationContainer>
      {user ? <WelcomeScreen /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default App;
