import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import BottomTab from "./app/navigation/BottomTab";
import { UserLocationContext } from "./app/context/UserLocationContext";
import { LoginContext } from "./app/context/LoginContext";
import { UserReversedGeoCode } from "./app/context/UserReversedGeoCode";
import { VendorContext } from "./app/context/VendorContext";
import FoodNavigator from "./app/navigation/FoodNavigator";
import VendorsPage from "./app/navigation/VendorsPage";
import Vendor from "./app/screens/vendor/Vendor";
import AddRating from "./app/screens/AddRating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from "./app/screens/SignUp";
import { CartCountContext } from "./app/context/CartCountContext";
import { UserContext } from "./app/context/UserContext";
import VendorRegistrationPage from "./app/components/VendorRegistrationPage";
import AllVendors from "./app/components/Vendor Screens/AllVendors";
import UpdateVendorForm from "./app/components/Vendor Screens/UpdateVendor";
import VendorShopDetail from "./app/components/Vendor Screens/ShowVendorDetail";
import AddProduct from "./app/components/Product/AddProduct";
import ProductsPage from "./app/components/Product/ProductsPage";
import UpdateProduct from "./app/components/Product/UpdateProductPage";
import { CartContext } from "./app/context/CartContext";
import ProductsList from "./app/components/Vendor Screens/ShowAllProductsToUser";
// import Vendor from "./app/screens/vendor/Vendor";

const Stack = createNativeStackNavigator();
export default function App() {
  const [location, setLocation] = useState(null);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [vendorObj, setVendorObj] = useState(null);
  const [error, setErrorMsg] = useState(null);
  const [cart, setCart] = useState([]);
  // const addToCart = () => {};
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     // Check if the item is already in the cart
  //     const itemIndex = prevCart.findIndex((item) => item.id === product.id);

  //     if (itemIndex !== -1) {
  //       // If item exists, update the quantity
  //       const updatedCart = [...prevCart];
  //       updatedCart[itemIndex] = {
  //         ...updatedCart[itemIndex],
  //         quantity: updatedCart[itemIndex].quantity + 1, // Increment quantity
  //       };
  //       return updatedCart;
  //     } else {
  //       // If item doesn't exist, add new item with quantity set to 1
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Update the quantity of the existing product
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product with quantity set to 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // const removeFromCart = () => {};
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const defaultAddress = {
    city: "Shanghai",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAddress(defaultAddress);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location is required!");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      loginStatus();
      // console.log('app ki lication',location)
    })();
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem("token");

    if (userToken !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    // console.log(login);
  };

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <VendorContext.Provider value={{ vendorObj, setVendorObj }}>
          <LoginContext.Provider value={{ login, setLogin }}>
            <UserContext.Provider value={{ user, setUser }}>
              <CartCountContext.Provider value={{ cartCount, setCartCount }}>
                <CartContext.Provider
                  value={{ cart, addToCart, removeFromCart }}
                >
                  <NavigationContainer>
                    <Stack.Navigator>
                      <Stack.Screen
                        name="bottom-navigation"
                        component={BottomTab}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="food-nav"
                        component={FoodNavigator}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="vendors-page"
                        component={VendorsPage}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="vendor"
                        component={Vendor}
                        options={{ headerShown: true }}
                      />
                      <Stack.Screen
                        name="signUp"
                        component={SignUp}
                        options={{ headerShown: true }}
                      />
                      <Stack.Screen
                        name="rating"
                        component={AddRating}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="shopDetails"
                        component={VendorShopDetail}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="addProduct"
                        component={AddProduct}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="registrationPage"
                        component={VendorRegistrationPage}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="showVendorsPage"
                        component={AllVendors}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="UpdateVendor"
                        component={UpdateVendorForm}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="ProductsPage"
                        component={ProductsPage}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="UpdateProduct"
                        component={UpdateProduct}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="ProductsListPage"
                        component={ProductsList}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </CartContext.Provider>
              </CartCountContext.Provider>
            </UserContext.Provider>
          </LoginContext.Provider>
        </VendorContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
