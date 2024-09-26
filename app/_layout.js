import { Stack } from "expo-router";
import ToastNotification from '../components/toast'; // Ensure correct import path


const RootLayout = () => {
    return (
        <>
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
    </>
    )
};

export default RootLayout;