import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const CatPage = () => {
  const navigation = useNavigation();
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      name: "Vehicles",
      subcategories: ["Car", "Two-Wheelers", "Bicycle"],
    },
    {
      name: "Rooms",
      subcategories: ["Single-Bed", "Double-Bed", "Multi-Bed"],
    },
    {
      name: "Clothes",
      subcategories: ["Winter Clothes", "Others"],
    },
    {
      name: "Tour Guide",
      subcategories: ["Guides"],
    },
    {
      name: "Hiking Gear",
      subcategories: ["Bagpacks", "Equipments", "Others"],
    },
    {
      name: "Camera Accessories",
      subcategories: ["Cameras", "Tripods", "Others"],
    },
    {
      name: "Camping Equipment",
      subcategories: ["Travel Toileteries", "Tents", "Others"],
    },
    {
      name: "Others",
      subcategories: ["Others"],
    },
  ];

  const handleClickCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleClickSub = (cat, subcat) => {
    navigation.navigate("AddProduct", { openCategory: openCategory });
  };

  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.body}>
        <Text style={styles.heading}>POST YOUR AD:</Text>
        <Text style={styles.categoryText}>Choose a Category</Text>
        <View style={styles.categoryBox}>
          {categories.map((category, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleClickCategory(category.name)}
              >
                <Text>{category.name}</Text>
                <MaterialIcons
                  name={
                    openCategory === category.name
                      ? "expand-less"
                      : "expand-more"
                  }
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              {openCategory === category.name && (
                <View>
                  {category.subcategories.map((subcat, subIndex) => (
                    <TouchableOpacity
                      key={subIndex}
                      style={styles.subcategoryItem}
                      onPress={() => handleClickSub(category.name, subcat)}
                    >
                      <Text>{subcat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  categoryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  categoryBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  subcategoryItem: {
    paddingVertical: 10,
    marginLeft: 30,
  },
});

export default CatPage;
