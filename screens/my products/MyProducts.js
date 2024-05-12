import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import img from "./image.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmationModal from "./ConfirmationModal";
import Header from "../components/header/Header";
import Subheader from "../components/SubHeader";
import Footer from "../components/Footer";

const MyProducts = ({
  isMenuOpen,
  changeVisibility,
  cityToShow,
  changeCity,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isUser, setIsUser] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const url = "http://192.168.224.202:8000/my-product";
          const data = { userId };
          const response = await axios.post(url, data);
          if (response.data.products) {
            setProducts(response.data.products);
          }
        } else {
          setIsUser(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleConfirmation = async (productId) => {
    setModalOpen(false);
    try {
      const response = await axios.post(
        `http://192.168.224.202:8000/remove-product`,
        { productId }
      );
      if (response.data.message) {
        const updatedProducts = products.filter(
          (item) => item._id !== selectedProductId
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
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
      <View style={styles.container}>
        {isUser ? (
          products.length ? (
            <ScrollView>
              <Text style={styles.heading}>MY ADS</Text>
              <View style={styles.productsContainer}>
                {products.map((item) => (
                  <View key={item._id} style={styles.productCard}>
                    <Image
                      source={{
                        uri: `http://192.168.224.202:8000/${item.pimage}`,
                      }}
                      style={styles.productImage}
                    />
                    <Text style={styles.productPrice}>
                      Rs. {item.price}/day
                    </Text>
                    <Text style={styles.productName}>
                      {item.pname} | {item.category}
                    </Text>
                    <Text style={styles.productDescription}>{item.pdesc}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                      <Text style={styles.deleteIcon}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <ConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                onConfirm={handleConfirmation}
                productId={selectedProductId}
              />
            </ScrollView>
          ) : (
            <>
              <Text style={styles.heading}>MY ADS</Text>
              <Image source={img} style={styles.image}></Image>
            </>
          )
        ) : null}
      </View>
      <Footer changeVisibility={changeVisibility} isMenuOpen={isMenuOpen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3,
    marginBottom: 50,
    zIndex: -1,
  },
  header: {
    zIndex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  productCard: {
    width: "45%",
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    color: "blue",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  deleteIcon: {
    color: "red",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  image: {
    width: "100%", // You can adjust this as per your requirement
    height: "80%", // You can adjust this as per your requirement
  },
});

export default MyProducts;
