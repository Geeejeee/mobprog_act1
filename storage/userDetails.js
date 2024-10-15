import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save user data
export const saveLoginData = async (firstName, lastName, email, userName, password) => {
  try {
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('lastName', lastName);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('userName', userName);
    await AsyncStorage.setItem('password', password);
  } catch (error) {
    console.error('Error saving data to AsyncStorage', error);
  }
};

// Function to retrieve user data
export const getLoginData = async () => {
  try {
    const firstName = await AsyncStorage.getItem('firstName');
    const lastName = await AsyncStorage.getItem('lastName');
    const email = await AsyncStorage.getItem('email');
    const userName = await AsyncStorage.getItem('userName');
    const password = await AsyncStorage.getItem('password');
    if (email !== null && password !== null) {
      return { firstName, lastName, email, userName, password };
    }
    return null;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage', error);
  }
};

// Function to clear user data
export const clearLoginData = async () => {
  try {
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('password');
  } catch (error) {
    console.error('Error clearing data from AsyncStorage', error);
  }
};


