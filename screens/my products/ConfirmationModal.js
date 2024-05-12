import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  productId,
}) => {
  return (
    <Modal visible={isOpen} onRequestClose={onRequestClose} transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          Are you sure you want to remove this item?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => onConfirm(productId)}
            style={[styles.button, { backgroundColor: "#e74c3c" }]}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRequestClose}
            style={[styles.button, { backgroundColor: "#3498db" }]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgb(138, 214, 135)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 300,
    marginHorizontal: 80,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ConfirmationModal;
