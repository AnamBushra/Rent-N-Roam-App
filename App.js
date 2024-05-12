import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Home from "./screens/Home";
import CityWise from "./screens/citywise/CityWise";
import Header from "./screens/components/header/Header";
import Subheader from "./screens/components/SubHeader";
import Footer from "./screens/components/Footer";
import CatPage from "./screens/catpage/CatPage";
import AddProduct from "./screens/catpage/AddProduct";
import Welcome from "./screens/login signup/Welcome";
import LoginPage from "./screens/components/login/Login";
import RegisterPage from "./screens/login signup/Register";
import UpdateProfile from "./screens/update Profile/UpdateProfile";
import SearchFiltered from "./screens/filtered products/SearchFiltered";
import DetailView from "./screens/product/DetailView";
import Cart from "./screens/cart/Cart";
import MyProducts from "./screens/my products/MyProducts";
import FilteredProducts from "./screens/filtered products/FilteredProducts";
import { useState } from "react";
const Stack = createStackNavigator();
export default function App() {
  const [isMenuOpen, setIsMenuVisible] = useState(false);
  const [cityToShow, setCityToShow] = useState("");
  const changeVisibility = (isVisible) => {
    setIsMenuVisible(isVisible);
  };
  const changeCity = (val) => {
    setCityToShow(val);
  };
  return (
    <>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={styles.content}>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                children={({ navigation }) => (
                  <Home
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CityWise"
                children={({ navigation }) => (
                  <CityWise
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CatPage"
                children={({ navigation }) => (
                  <CatPage
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
              />
              <Stack.Screen
                name="AddProduct"
                children={({ navigation }) => (
                  <AddProduct
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                children={({ navigation }) => (
                  <Welcome
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                children={({ navigation }) => (
                  <LoginPage
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                children={({ navigation }) => (
                  <RegisterPage
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UpdateProfile"
                children={({ navigation }) => (
                  <UpdateProfile
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SearchFiltered"
                children={({ navigation }) => (
                  <SearchFiltered
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DetailView"
                children={({ navigation }) => (
                  <DetailView
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Cart"
                children={({ navigation }) => (
                  <Cart
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyProducts"
                children={({ navigation }) => (
                  <MyProducts
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FilteredProducts"
                children={({ navigation }) => (
                  <FilteredProducts
                    navigation={navigation}
                    isMenuOpen={isMenuOpen}
                    changeVisibility={changeVisibility}
                    cityToShow={cityToShow}
                    changeCity={changeCity}
                  />
                )}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
});
