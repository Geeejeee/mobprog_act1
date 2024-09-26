import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{
            headerTitleAlign: 'center',
          }}>
            <Tabs.Screen name="WelcomeScreen"  options={{
               headerTitle: "Home",
               title: "Home",
               tabBarIcon: () => (<MaterialCommunityIcons name="home" size={24} color="black" />),
            }}/>
            <Tabs.Screen name="aboutUs"  options={{
               headerTitle: "About Us",
               title: "About Us",
               tabBarIcon: () => (<MaterialCommunityIcons name="information" size={24} color="black" />),
            }}/>
            <Tabs.Screen name="class"  options={{
               headerTitle: "Class",
               title: "Class",
               tabBarIcon: () => (<MaterialCommunityIcons name="school" size={24} color="black" />),
            }}/>
        </Tabs>   
    )
}