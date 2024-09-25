import React from 'react';
import { Redirect } from 'expo-router'; // Slot handles your routes


export default function App() {
  return <Redirect href="/login" />;
}

