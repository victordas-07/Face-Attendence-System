import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import RegisterFaceScreen from "./screens/RegisterFaceScreen";
import CameraRecognitionScreen from "./screens/CameraRecognitionScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import WebCameraRecognitionScreen from "./screens/WebCameraRecognitionScreen";

const Stack = createStackNavigator();

export default function App() {
  const isWeb = Platform.OS === "web";

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterFaceScreen} />
        <Stack.Screen
          name="CameraRecognition"
          component={isWeb ? WebCameraRecognitionScreen : CameraRecognitionScreen}
        />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
