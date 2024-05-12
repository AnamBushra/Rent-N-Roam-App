import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GroupButton = () => {
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter((counter) => counter - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, counter === 0 ? styles.disabledButton : null]}
        onPress={handleDecrement}
        disabled={counter === 0}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.counter}>{counter}</Text>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  counter: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});

export default GroupButton;
