import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Navbar from "./components/Navbar";
import Banner from "./components/banner/Banner";
import Slide from "./components/slide/Slide";
import Rent from "./components/Services/Rent";
import { useNavigation } from "@react-navigation/native";
import Header from "./components/header/Header";
import Subheader from "./components/SubHeader";
import Footer from "./components/Footer";

const Home = ({ changeVisibility, isMenuOpen, cityToShow, changeCity }) => {
  const navigation = useNavigation();

  const handleCityClick = (city) => {
    changeVisibility(false);
    navigation.navigate("CityWise", { city });
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

      <ScrollView style={styles.container} scrollEnabled={!scrollEnabled}>
        <Navbar />
        <Banner />
        <Slide onCityClick={handleCityClick} />
        <Rent />
      </ScrollView>
      <Footer changeVisibility={changeVisibility} isMenuOpen={isMenuOpen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
    paddingTop: 7,
    paddingBottom: 40,
    marginBottom: 50,
    zIndex: -1,
  },
  header: {
    zIndex: 1,
  },
  static: {
    position: "absolute",
    zIndex: -1,
  },
});

export default Home;
