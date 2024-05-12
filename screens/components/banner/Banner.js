import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React, { useRef, useState } from "react";
import CarouselSlider, { Pagination } from "react-native-snap-carousel";
import img1 from "./pics/1.png";
import img2 from "./pics/page2.png";
import img3 from "./pics/2.png";
import img5 from "../../../constants/pics/Home Main/2.png";
import img6 from "../../../constants/pics/Home Main/3.png";
import img from "../../../constants/pics/Home1.png";

const sliderWidth = Dimensions.get("screen").width;

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselData = [
    { id: 1, src: img1 },
    { id: 2, src: img },
    { id: 3, src: img2 },
    { id: 4, src: img3 },
    { id: 6, src: img5 },
    { id: 7, src: img6 },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.src} style={styles.imgStyle} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <CarouselSlider
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay
        autoplayInterval={5000}
        loop
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        inactiveDotStyle={{ width: 15, height: 15, borderRadius: 10 }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotColor="yellow"
        inactiveDotColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: "relative",
  },
  imgStyle: {
    height: 180,
    width: "100%",
    resizeMode: "stretch",
  },
});

export default Banner;
