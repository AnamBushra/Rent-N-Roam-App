import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import ProductDetail from "./ProductDetail";
import ActionItem from "./ActionItem";
import { useParams, useRoute } from "@react-navigation/native";
import Header from "../components/header/Header";
import Subheader from "../components/SubHeader";
import Footer from "../components/Footer";

const DetailView = ({
  isMenuOpen,
  changeVisibility,
  cityToShow,
  changeCity,
}) => {
  const route = useRoute();
  const { id } = route.params;
  const productId = String(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.224.202:8000/get-product/${productId}`
        );
        setProduct(response.data.product); // Assuming your backend returns a single product
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const handleScroll = (flag) => {
    setScrollEnabled(flag);
  };
  return (
    <>
      <View style={styles.header}>
        <Header
          changeVisibility={changeVisibility}
          isMenuOpen={isMenuOpen}
          handleScroll={handleScroll}
        />
      </View>
      <Subheader
        changeVisibility={changeVisibility}
        isMenuOpen={isMenuOpen}
        cityToShow={cityToShow}
        changeCity={changeCity}
      />
      <ScrollView vertical style={styles.container}>
        {product && (
          <View>
            <ActionItem product={product} />
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{product.pname}</Text>
              <Text style={styles.price}>₹{product.price}/day</Text>
              <Text style={styles.description}>{product.pdesc}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons
                  name="location-on"
                  size={20}
                  color="#875608"
                  style={styles.locationIcon}
                />
                <Text style={styles.location}>Location: {product.pcity}</Text>
              </View>
              <ProductDetail product={product} />
            </View>
          </View>
        )}
      </ScrollView>
      <Footer changeVisibility={changeVisibility} isMenuOpen={isMenuOpen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    marginBottom: 50,
    zIndex: -1,
  },
  detailsContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
    color: "#6b0727",
  },
  price: {
    fontSize: 16,
    color: "#875608",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#446114",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationIcon: {
    marginRight: 5,
  },
  location: {
    fontSize: 16,
    color: "#875608",
  },
  header: {
    zIndex: 1,
  },
});

export default DetailView;
