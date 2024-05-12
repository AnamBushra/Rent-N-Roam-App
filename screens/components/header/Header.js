import img from "./pics/logo3.png";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";

export default function Header({
  isMenuOpen,
  changeVisibility,
  scrollEnabled,
  handleScroll,
}) {
  const [text, setText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigator = useNavigation();
  useEffect(() => {
    if (!isMenuOpen) {
      handleScroll(false);
    }
    setText("");
    setShowSuggestions(false);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.224.202:8000/get-products"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [isMenuOpen]);

  const handleInputChange = (inputText) => {
    handleScroll(true);
    setText(inputText);
    changeVisibility(true);
    setShowSuggestions(true); // Show suggestions when typing
    if (inputText === "") {
      setShowSuggestions(false);
      handleScroll(false);
      return;
      // Hide suggestions when input is empty
    }
    const filtered = products.filter(
      (product) =>
        product.pname.toLowerCase().includes(inputText.toLowerCase()) ||
        product.pdesc.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };
  const handleSearchClick = () => {
    handleScroll(false);
    setShowSuggestions(false);
    changeVisibility(false);
    navigator.replace("SearchFiltered", { text: text });
  };
  const handleSuggestionClick = (productId) => {
    handleScroll(false);
    setShowSuggestions(false);
    changeVisibility(false);
    navigator.navigate("DetailView", { id: productId });
  };
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.logo} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search...."
          value={text}
          onChangeText={handleInputChange}
        />
        {isMenuOpen && showSuggestions && filteredProducts.length > 0 && (
          <ScrollView
            vertical
            showsVerticalScrollIndicator={true}
            style={styles.suggestionList}
            scrollEnabled={scrollEnabled}
            nestedScrollEnabled={true}
          >
            <FlatList
              nestedScrollEnabled={true}
              data={filteredProducts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionClick(item._id)}
                >
                  <Text>{item.pname}</Text>
                  <Text>{item.pdesc}</Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchClick}
        >
          <MaterialIcons name="search" size={24} color="#015e65" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#015e65",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 30,
    position: "relative",
  },
  logo: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    flex: 1,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#85ef57",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: "white",
    flex: 1,
    elevation: 3,
    paddingHorizontal: 10,
    maxHeight: 500,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
