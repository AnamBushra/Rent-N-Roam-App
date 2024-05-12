import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalView = ({ cartItems }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const totalAmount = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseInt(item.price);
    });
    setPrice(totalPrice);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>PRICE DETAILS</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.typography}>Price ({cartItems?.length} item)</Text>
        <Text style={styles.price}>₹{parseInt(price)}</Text>
      </View>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmount}>Total Amount: ₹{parseInt(price)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  header: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginBottom: 10,
  },
  typography: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmountContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
    marginTop: 10,
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TotalView;
