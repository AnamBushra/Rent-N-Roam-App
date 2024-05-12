import React, { useState, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import stateCityData from "../../constants/stateCityData";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddProduct() {
  const navigation = useNavigation();
  const route = useRoute();
  const { openCategory } = route.params;
  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [image, setImage] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState(null);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.assets[0].uri);
  };

  const handleApi = async () => {
    try {
      const formData = new FormData();
      formData.append("pname", pname);
      formData.append("pdesc", pdesc);
      formData.append("price", price);
      formData.append("category", openCategory);
      formData.append("pimage", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });
      formData.append("plat", userCoordinates.latitude);
      formData.append("plong", userCoordinates.longitude);
      formData.append("pcity", selectedCity);
      formData.append("userId", userId);
      const response = await axios.post(
        "http://192.168.224.202:8000/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        setPname("");
        setPdesc("");
        setPrice("");
        setSelectedCity("");
        setImage(null);
        Alert.alert("Product Uploaded Successfully!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error while adding product:", error);
    }
  };

  useEffect(() => {
    const getUserCoordinates = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting user coordinates:", error);
      }
    };

    getUserCoordinates();
  }, []);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Calculate distance between user location and each city
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
    };

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    if (userCoordinates) {
      const { latitude, longitude } = userCoordinates;
      const citiesWithDistance = Object.entries(stateCityData).flatMap(
        ([state, cities]) =>
          Object.entries(cities).map(([city, cityCoordinates]) => {
            const distance = calculateDistance(
              latitude,
              longitude,
              cityCoordinates.latitude,
              cityCoordinates.longitude
            );
            return {
              state,
              city,
              distance,
            };
          })
      );

      const filteredCities = citiesWithDistance.filter(
        (city) => city.distance <= 100
      );
      setFilteredCities(filteredCities);
    }
  }, [userCoordinates]);

  useEffect;

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 120 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>ADD PRODUCT HERE</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Product Name"
        value={pname}
        onChangeText={(text) => setPname(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Product Description"
        value={pdesc}
        onChangeText={(text) => setPdesc(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Your City</Text>
        <View style={styles.city}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
            style={styles.city}
          >
            {filteredCities.map((city) => (
              <Picker.Item label={city.city} value={city.city} key={city.id} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Choose Image
        </Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            marginBottom: 10,
            alignSelf: "center",
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleApi}>
        <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AddProduct;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    marginBottom: 20,
    backgroundColor: "rgba(1, 94, 101,1)",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  pickerContainer: {
    marginBottom: 20,
    alignSelf: "flex-start",
    width: "100%",
  },
  label: {
    fontSize: 16,
  },
  city: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
  },
});
