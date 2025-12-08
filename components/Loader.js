// components/Loader.js
import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

export default function Loader({ text = "Loading models..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
