import React from 'react';
import AppNavigation from './navigation/appNavigation'; // Import navigation setup
import ToastNotification from './components/toast';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <AppNavigation />
    <ToastNotification />
    </>
  );
};

export default App;