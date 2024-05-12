import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const EmptyCart = () => {
  const imgurl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: imgurl }} style={styles.image} />
        <Text style={styles.typography}>Your cart is empty!</Text>
        <Text style={styles.typography}>Add items to it now.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  typography: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default EmptyCart;
