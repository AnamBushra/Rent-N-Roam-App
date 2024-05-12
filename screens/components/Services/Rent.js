import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Import your images
import img1 from "./pics/1.png";
import img2 from "./pics/2.png";
import img3 from "./pics/3.png";
import img5 from "./pics/5.png";

const Rent = () => {
  return (
    <View style={styles.rentBody}>
      <Text style={styles.title}>Features</Text>
      <Text style={styles.subtitle}>OUR SERVICES!</Text>
      <View style={styles.row}>
        <View style={styles.box}>
          <Image source={img1} style={styles.image} />
          <Text style={styles.heading}>Personalized Discoveries</Text>
          <Text style={styles.description}>
            Personalized guides showcase destinations and recommend specific
            areas for exploration, highlighting the necessary equipment and
            accessories for an immersive experience.
          </Text>
        </View>
        <View style={styles.box}>
          <Image source={img2} style={styles.image} />
          <Text style={styles.heading}>Direct Seller Interaction</Text>
          <Text style={styles.description}>
            A centralized platform where local sellers offer a diverse range of
            travel accessories and equipment, allowing users to find, compare,
            and rent items needed for their adventures.
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Image source={img5} style={styles.image} />
          <Text style={styles.heading}>Comprehensive Rental Hub</Text>
          <Text style={styles.description}>
            Your exploration, our priority. Our comprehensive solutions cover
            everything you need for a seamless experience. From diverse rental
            options to detailed area insights, we've got your adventure covered.
          </Text>
        </View>
        <View style={styles.box}>
          <Image source={img3} style={styles.image} />
          <Text style={styles.heading}>Curated Travel Experiences</Text>
          <Text style={styles.description}>
            Expertly curated content provides insights into destinations,
            guiding users to discover unique areas and the essential accessories
            required, ensuring a hassle-free and enjoyable travel experience.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rentBody: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DCDCDC",
    paddingHorizontal: 8,
    paddingTop: 2,
    marginBottom: 20,
  },
  heading: {
    color: "#545454",
    fontSize: 15,
    marginTop: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#545454",
    fontSize: 20,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  box: {
    width: "48%", // Adjust width as needed
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: "100%", // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 11,
  },
});

export default Rent;
