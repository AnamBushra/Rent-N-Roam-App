import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import stateCityData from "../../constants/stateCityData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function Subheader({
  isMenuOpen,
  changeVisibility,
  cityToShow,
  changeCity,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleLocationChange = async (selectedLocation) => {
    const [state, city] = selectedLocation.split("-");
    const cityData = stateCityData[state][city];
    changeCity(city);
    // Extract latitude and longitude from city data
    const latitude = cityData.latitude;
    const longitude = cityData.longitude;

    try {
      // Save latitude and longitude to AsyncStorage
      await AsyncStorage.setItem("userLoc", `${latitude},${longitude}`);
      await AsyncStorage.setItem("userCity", city);

      // Update state
      setSelectedState(state);
      setSelectedCity(city);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <View style={styles.subheader}>
      <MaterialIcons name="location-on" size={24} color="#85ef57" />
      <TouchableOpacity
        style={styles.subheader2}
        onPress={() => {
          changeVisibility(true);
          setShowDropdown(!showDropdown);
        }}
      >
        <Text style={styles.subheaderText}>
          {cityToShow === "" ? "Select your destination" : cityToShow}
        </Text>
        <AntDesign name="down" size={20} color="#85ef57" />
      </TouchableOpacity>
      {showDropdown && isMenuOpen && (
        <ScrollView vertical style={styles.dropdown} nestedScrollEnabled>
          {Object.keys(stateCityData).map((state, index) => (
            <View key={index}>
              <Text style={styles.stateText}>{state}</Text>
              {Object.keys(stateCityData[state]).map((city, cityIndex) => (
                <TouchableOpacity
                  key={cityIndex}
                  style={styles.cityButton}
                  onPress={() => handleLocationChange(`${state}-${city}`)}
                >
                  <Text>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subheader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(1, 94, 101, 0.6)",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subheader2: {
    flexDirection: "row",
    alignItems: "center",
  },
  subheaderText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginLeft: 10,
    marginRight: 8,
  },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: "white",
    flex: 1,
    elevation: 3,
    paddingHorizontal: 0,
    maxHeight: 500,
    borderBottomWidth: 1,
  },
  stateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  cityButton: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
});
