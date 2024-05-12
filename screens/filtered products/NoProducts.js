import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import img from "./image.png";

const NoProducts = () => {
  return (
    <View style={styles.component}>
      <View style={styles.container}>
        <Image source={img} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginTop: 30,
    width: "100%",
    height: "65vh", // Not directly translatable, use a specific height in pixels or percentage
  },
  container: {
    alignItems: "center",
  },
  image: {
    width: "100%", // You can adjust this as per your requirement
    height: 400, // You can adjust this as per your requirement
    marginTop: 20,
  },
});

export default NoProducts;
