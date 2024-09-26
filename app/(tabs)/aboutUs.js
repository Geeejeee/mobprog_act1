// app/(tabs)/AboutUs.js
import React from 'react';
import { View, Text, ImageBackground} from 'react-native';
import { globalStyles } from '../../styles/global.js';

const backgroundImage = { uri: 'https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };

const AboutUs = () => {
  return (
    <ImageBackground source={backgroundImage} style={globalStyles.container}>
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>About Us</Text>
      <Text>This is the About Us page!</Text>
    </View>
    </ImageBackground>
  );
};

export default AboutUs;
