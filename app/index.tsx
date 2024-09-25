import React from 'react';
import {Redirect } from 'expo-router';
import ToastNotification from '../components/toast.js';


export default function App() {
  return (
    <>
    <Redirect href="LoginScreen" />
    <ToastNotification />
    </>
  );
};
