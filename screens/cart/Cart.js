import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartView from "./CartView";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import Header from "../components/header/Header";
import Subheader from "../components/SubHeader";
import Footer from "../components/Footer";

const Cart = ({ isMenuOpen, changeVisibility, cityToShow, changeCity }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const url = `http://192.168.224.202:8000/liked-products/${userId}`;
          const response = await axios.get(url);
          if (response.data && response.data.cartItems) {
            setCartItems(response.data.cartItems);
          }
        }
      } catch (error) {
        console.error("Error fetching cartItems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [refresh]);

  const changeState = () => {
    setRefresh(!refresh);
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
            <Text style={styles.loadingText}>Loading....</Text>
          </View>
        ) : cartItems.length ? (
          <>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.heading}>My Cart ({cartItems.length})</Text>
              {cartItems.map((item, index) => (
                <CartItem key={index} item={item} setRefresh={changeState} />
              ))}
            </ScrollView>
            <View style={styles.cartView}>
              <CartView cartItems={cartItems} />
            </View>
          </>
        ) : (
          <EmptyCart />
        )}
      </View>
      <Footer changeVisibility={changeVisibility} isMenuOpen={isMenuOpen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 15,
    zIndex: -1,
  },
  header: {
    zIndex: 1,
  },
  contentContainer: {
    flexGrow: 1,
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
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bottom: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  cartView: {
    paddingVertical: 10,
    marginBottom: 40,
  },
});

export default Cart;
