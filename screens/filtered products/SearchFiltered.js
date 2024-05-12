import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import img from "./image2.png";

const SearchFiltered = ({ changeVisibility }) => {
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const navigator = useNavigation();
  const { text } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home"); // Navigate to the home screen
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up event listener on unmount
  }, [navigation]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://192.168.224.202:8000/get-products`
        );
        if (response.data.products) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const userLoc = await AsyncStorage.getItem("userLoc");
        if (userLoc && userLoc !== "null,null") {
          const [userLat, userLng] = userLoc.split(",").map(Number);
          setProducts((prevProducts) => {
            return prevProducts.filter((product) => {
              const productLoc = product.pLoc.coordinates;
              if (productLoc) {
                const distance = calculateDistance(
                  userLat,
                  userLng,
                  productLoc[0],
                  productLoc[1]
                );
                return distance <= 150;
              }
              return true;
            });
          });
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, [products]); // Dependency on products

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

  const handleProductClick = (productId) => {
    changeVisibility(false);
    navigator.navigate("DetailView", { id: productId });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bigbox}>
          <Text style={styles.heading}>Search Results for {text}</Text>
          <View style={styles.productsContainer}>
            {products
              .filter(
                (product) =>
                  product.pname.toLowerCase().includes(text.toLowerCase()) ||
                  product.pdesc.toLowerCase().includes(text.toLowerCase())
              )
              .map((product) => (
                <TouchableOpacity
                  key={product._id}
                  style={styles.productCard}
                  onPress={() => handleProductClick(product._id)} // Pass a function reference instead of calling the function directly
                >
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: `http://192.168.224.202:8000/${product.pimage}`,
                    }}
                  />
                  <Text style={styles.price}>Rs. {product.price} /-</Text>
                  <Text style={styles.title}>
                    {product.pname} | {product.category}
                  </Text>
                  <Text style={styles.description}>{product.pdesc}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bigbox: {
    marginTop: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  productCard: {
    margin: 10,
    width: 250,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  price: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    marginTop: 5,
  },
  image: {
    width: "100%", // You can adjust this as per your requirement
    height: "80%", // You can adjust this as per your requirement
  },
});

export default SearchFiltered;
