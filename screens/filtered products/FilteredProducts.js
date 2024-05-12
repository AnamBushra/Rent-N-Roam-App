import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import NoProducts from "./NoProducts";
import { useNavigation, useRoute } from "@react-navigation/native";

const FilteredProducts = ({ changeVisibility }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { city, category } = route.params || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.224.202:8000/get-products"
        );
        if (response.data.products) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update the count when products or filter criteria change
    const filteredProducts = products.filter(
      (item) => item.pcity === city && item.category === category
    );
    setCount(filteredProducts.length);
  }, [products, city, category]);

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={styles.loadingText}>Loading....</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.bigBox}>
            <Text style={styles.heading}>
              {category} in {city}
            </Text>
            <View style={styles.productContainer}>
              {products.map(
                (item, index) =>
                  item.pcity === city &&
                  item.category === category && (
                    <TouchableOpacity
                      key={index}
                      style={styles.card}
                      onPress={() => {
                        changeVisibility(false);
                        navigation.navigate("DetailView", {
                          id: item._id,
                        });
                      }}
                    >
                      <Image
                        source={{
                          uri: `http://192.168.224.202:8000/${item.pimage}`,
                        }}
                        style={styles.image}
                      />
                      <Text style={styles.priceText}>Rs. {item.price} /-</Text>
                      <Text>
                        {item.pname} | {item.category}
                      </Text>
                      <Text style={styles.description}>{item.pdesc}</Text>
                    </TouchableOpacity>
                  )
              )}
            </View>
            {!count && <NoProducts />}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
  },
  bigBox: {
    marginTop: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    width: "80%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
});

export default FilteredProducts;
