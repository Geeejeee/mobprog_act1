import { Stack } from "expo-router";

const RootLayout = () => {
    return (
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
    )
};

export default RootLayout;