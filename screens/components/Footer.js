import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const Footer = ({ isMenuOpen, changeVisibility }) => {
  useEffect(() => {
    checkLoginStatus(); // Check login status when component mounts
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();
  const handleHomeIconClick = () => {
    changeVisibility(false);
    navigation.navigate("Home");
  };
  const handleCartClick = () => {
    changeVisibility(false);
    navigation.navigate("Cart");
  };
  const handleSellerIconClick = async () => {
    changeVisibility(false);
    await checkLoginStatus();
    if (isLoggedIn) {
      navigation.navigate("CatPage");
    } else navigation.navigate("Welcome");
  };
  const handlePersonIconClick = async () => {
    changeVisibility(true);
    await checkLoginStatus();
    if (isLoggedIn) {
      changeVisibility(true);
      setIsMenuVisible(true);
    } else {
      changeVisibility(false);
      navigation.navigate("Welcome");
    }
  };
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };
  const handleMenuOptionClick = async (option) => {
    changeVisibility(false);
    setIsMenuVisible(false);
    if (option === "Logout") {
      // Clear the token from AsyncStorage
      try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("userLoc");
        await AsyncStorage.removeItem("userCity");
        // Hide the menu after clearing the token
        setIsMenuVisible(false);
        Alert.alert("Logged Out Successfully");
        // Update the login status after removing the token
        setIsLoggedIn(false);
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else if (option === "Update Profile") {
      navigation.navigate("UpdateProfile");
    } else if (option === "My Ads") {
      navigation.navigate("MyProducts");
    }
  };
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <View style={styles.footer}>
      {isMenuVisible && isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuOptionClick("Update Profile")}
            style={styles.menuOptions}
          >
            <MaterialIcons name="person" size={24} color="#333" />
            <Text style={styles.menuOption}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuOptionClick("My Ads")}
            style={styles.menuOptions}
          >
            <MaterialIcons name="store" size={24} color="#333" />
            <Text style={styles.menuOption}>My Ads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuOptionClick("Logout")}
            style={styles.menuOptions}
          >
            <MaterialIcons name="exit-to-app" size={24} color="#333" />
            <Text style={styles.menuOption}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleHomeIconClick}
      >
        <MaterialIcons name="home" size={24} color="#85ef57" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handlePersonIconClick}
      >
        <MaterialIcons name="person" size={24} color="#85ef57" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleCartClick}>
        <MaterialIcons name="shopping-cart" size={24} color="#85ef57" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleSellerIconClick}
      >
        <MaterialIcons name="storefront" size={24} color="#85ef57" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(1, 94, 101,1)",
    paddingVertical: 10,
    position: "absolute",
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    backgroundColor: "#d4f5c6",
    bottom: 50, // Adjust this value to position the menu above the person icon
    left: 65,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuOption: {
    fontSize: 18,
    paddingVertical: 8,
    marginLeft: 10,
  },
  menuOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  closeButton: {
    position: "absolute",
    top: 3,
    right: 5,
  },
});

export default Footer;
