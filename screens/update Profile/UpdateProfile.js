import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (password !== currPassword) {
        alert("Passwords Don't Match");
      } else {
        // Make an API request to update the profile
        const response = await axios.post(
          "http://192.168.224.202:8000/update-profile",
          {
            password,
            mobileNumber,
            email,
            name,
            userId,
          }
        );

        // Handle the response as needed
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry={true}
        value={currPassword}
        onChangeText={(text) => setCurrPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UpdateProfile;
