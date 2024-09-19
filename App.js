import React from 'react';
import AppNavigation from './navigation/appNavigation'; // Import navigation setup
import ToastNotification from './components/toast';

const App = () => {
  return (
    <>
    <AppNavigation />
    <ToastNotification />
    </>
  );
};

export default App;