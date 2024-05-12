import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import { cityData } from "../../../constants/cityData";

const { width } = Dimensions.get("window");
const Slide = ({ onCityClick }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onCityClick(item.title.shortTitle)}
    >
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.title}>{item.title.shortTitle}</Text>
      <Text style={styles.tagline}>{item.tagline}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outer}>
      <Text style={styles.heading}>Explore India</Text>
      <View style={styles.container}>
        <Carousel
          data={cityData}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={250}
          autoplay={true}
          autoplayInterval={1500}
          loop={true}
          layout={"default"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#ffff",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#ffff",
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  heading: {
    marginTop: 18,
    paddingTop: 2,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "700",
    backgroundColor: "#ffff",
    fontSize: 28,
  },

  itemContainer: {
    backgroundColor: "#fffff",
  },
  image: {
    height: 160,
    width: 250,
    resizeMode: "cover",
    shadowColor: "#797C87",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  title: {
    fontWeight: "500",
    marginTop: 10,
  },
  tagline: {
    color: "green",
  },
});

export default Slide;
