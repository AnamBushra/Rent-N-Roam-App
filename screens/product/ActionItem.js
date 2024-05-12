import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";

const ActionItem = ({ product }) => {
  const navigation = useNavigation();

  const addItemToCart = async () => {
    let userId = await AsyncStorage.getItem("userId");

    const url = "http://192.168.224.202:8000/liked-products";
    const data = { userId, id: product._id };

    try {
      const response = await axios.post(url, data);
      if (response.data.message) {
        navigation.navigate("Cart");
      }
    } catch (error) {
      alert("Server Err.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `http://192.168.224.202:8000/${product.pimage}` }}
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => addItemToCart()}
        style={[styles.button, { backgroundColor: "#ff9f00" }]}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="add-shopping-cart" size={24} color="white" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#ff9f00",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ActionItem;
