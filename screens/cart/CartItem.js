import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GroupButton from "./ButtonGroup";
import axios from "axios";

const CartItem = ({ item, setRefresh }) => {
  const addEllipsis = (text) => {
    if (text.length > 50) {
      return text.substring(0, 50) + "...";
    }
  };
  const handleRemove = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const productId = item._id;
      const response = await axios.post(
        "http://192.168.224.202:8000/remove-from-cart",
        { userId, productId }
      );
      setRefresh();
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{ uri: `http://192.168.224.202:8000/${item.pimage}` }}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <GroupButton />
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.description}>{addEllipsis(item.pdesc)}</Text>
        <Text style={styles.seller}>Seller: RetailNet</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#c1d4d9",
    padding: 5,
  },
  left: {
    marginRight: 10,
  },
  image: {
    width: 110,
    height: 110,
  },
  buttonContainer: {
    marginTop: 10,
  },
  box: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  seller: {
    fontSize: 12,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "auto",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CartItem;
