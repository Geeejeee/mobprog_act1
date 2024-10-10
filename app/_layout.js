import { Stack } from "expo-router";
import ToastNotification from '../components/toast'; // Ensure correct import path
import { AuthProvider } from "../components/useContext";


const RootLayout = () => {
    return (
        <AuthProvider>
    <Stack>
        <Stack.Screen name="screens/LoginScreen" options={{
            headerShown:false,
            animation: "ios"
        }} />
        <Stack.Screen name="screens/SignupScreen" options={{
            headerShown:false,
            animation: "ios"
        }}/>
        <Stack.Screen name="(tabs)"  options={{
            headerShown: false
        }}/>
    </Stack>
    <ToastNotification />
    </AuthProvider>
    )
};

export default RootLayout;