import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { cityData } from "../../constants/cityData";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { categories } from "../../constants/Categories";
import { MaterialIcons } from "@expo/vector-icons";
import img1 from "../../constants/pics/City Common/1.png";
import img2 from "../../constants/pics/City Common/2.png";
import img3 from "../../constants/pics/City Common/3.png";
import Header from "../components/header/Header";
import Subheader from "../components/SubHeader";
import Footer from "../components/Footer";

const commonData = [img1, img2, img3];

const CityWise = ({ isMenuOpen, changeVisibility, cityToShow, changeCity }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { city } = route.params;
  const [selectedCity, setSelectedCity] = useState(
    cityData.find((cityN) => cityN.title.shortTitle === city)
  );

  const handleElementClick = (category) => {
    changeVisibility(false);
    setSelectedCity({ ...selectedCity, selectedCategory: category });
    console.log("Navigating with city:", city, "and category:", category);
    navigation.navigate("FilteredProducts", {
      city: city,
      category: category,
    });
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
        <Text style={styles.top}>{city}</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryButton}
              onPress={() => handleElementClick(category.name)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="rgb(128, 11, 83)"
              />
            </TouchableOpacity>
          ))}
          <View style={styles.carouselContainer}>
            <Carousel
              data={selectedCity ? selectedCity.images : commonData}
              renderItem={({ item }) => (
                <Image source={item} style={styles.image} />
              )}
              sliderWidth={350}
              itemWidth={300}
              loop={true}
              autoplay={true}
              autoplayInterval={5000}
            />
          </View>
        </View>
      </View>
      <Footer changeVisibility={changeVisibility} isMenuOpen={isMenuOpen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingVertical: 20,
    justifyContent: "flex-start",
  },
  top: {
    fontSize: 30,
    color: "rgb(88, 125, 79)",
    fontWeight: "700",
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categoryButton: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    backgroundColor: "#f8f7f6",
    borderWidth: 2,
    borderColor: "rgb(128, 11, 83)",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
    marginRight: 10,
  },
  carouselContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 30,
  },
  image: {
    width: "100%", // Adjust the width to cover the entire Carousel width
    height: 200, // Adjust the height as needed
    borderRadius: 10,
    resizeMode: "stretch",
  },
  header: {
    zIndex: 1,
  },
});

export default CityWise;
