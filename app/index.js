import React from 'react';
import { Redirect } from 'expo-router'; // Correct import for navigation
import ToastNotification from '../components/toast'; // Ensure correct import path

export default function Index() {

  

  return (
    <>
      <Redirect href="/screens/LoginScreen" />
      <ToastNotification />
    </>
  );
}
