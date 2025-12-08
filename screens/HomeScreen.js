import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Attendance System</Text>

      <View style={styles.btn}>
        <Button title="Register Face" onPress={() => navigation.navigate("Register")} />
      </View>

      <View style={styles.btn}>
        <Button title="Start Recognition" onPress={() => navigation.navigate("CameraRecognition")} />
      </View>

      <View style={styles.btn}>
        <Button title="View Attendance" onPress={() => navigation.navigate("Attendance")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center", padding: 20,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 40 },
  btn: { marginVertical: 10, width: "80%" },
});
