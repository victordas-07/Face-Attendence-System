import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterFaceScreen from "./screens/RegisterFaceScreen";
import CameraRecognitionScreen from "./screens/CameraRecognitionScreen";
import AttendanceScreen from "./screens/AttendanceScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterFaceScreen} />
        <Stack.Screen name="CameraRecognition" component={CameraRecognitionScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
