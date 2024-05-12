import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import img from "./navbar pics/1c.png";
import img2 from "./navbar pics/2c.png";
import img3 from "./navbar pics/3c.png";
import img4 from "./navbar pics/4c.png";
import img5 from "./navbar pics/5c.png";
import img6 from "./navbar pics/6c.png";
import img7 from "./navbar pics/7c.png";

const Navbar = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.navbar}>
        <View style={styles.products}>
          <Image source={img} style={styles.image} />
          <Text style={styles.text}>Hiking Gear</Text>
        </View>
        <View style={styles.products}>
          <Image source={img2} style={styles.image} />
          <Text style={styles.text}>Seasonal Wear</Text>
        </View>
        <View style={styles.products}>
          <Image source={img3} style={styles.image} />
          <Text style={styles.text}>Cabs/Vehicles</Text>
        </View>
        <View style={styles.products}>
          <Image source={img4} style={styles.image} />
          <Text style={styles.text}>Camping Equipment</Text>
        </View>
        <View style={styles.products}>
          <Image source={img5} style={styles.image} />
          <Text style={styles.text}>Tour Guide</Text>
        </View>
        <View style={styles.products}>
          <Image source={img6} style={styles.image} />
          <Text style={styles.text}>Hotels</Text>
        </View>
        <View style={styles.products}>
          <Image source={img7} style={styles.image} />
          <Text style={styles.text}>Accessories</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: "auto",
  },
  navbar: {
    flexDirection: "row",
  },
  products: {
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
});

export default Navbar;
