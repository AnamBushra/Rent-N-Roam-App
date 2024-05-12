import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logo from "../components/header/pics/logo3.png";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  const handleLoginClick = () => {
    navigation.navigate("Login");
  };
  const handleSignupClick = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginClick}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={handleSignupClick}
        >
          <Text style={styles.buttonText}>New here? Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    paddingTop: 100,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginBottom: 10,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#28a745", // Change color for register button
  },
});
