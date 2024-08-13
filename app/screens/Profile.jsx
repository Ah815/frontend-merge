// import React, { useState, useEffect } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import axios from "axios";
// import { useRoute } from "@react-navigation/native";

// const ProductsList = ({ navigation }) => {
//   const [products, setProducts] = useState([]); // Correct state variable name
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const route = useRoute();
//   const { vendorId } = route.params;

//   // Fetch products data from API
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         `https://store-backend-sage.vercel.app/api/products/getProducts/${vendorId}`
//       ); // Adjust URL as needed
//       console.log("Fetched products:", response.data);
//       setProducts(response.data.products); // Use setProducts to update state
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [vendorId]);

//   // Render individual product item
//   const renderProductItem = ({ item }) => (
//     <View style={styles.productCard}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.info}>Price: ${item.price}</Text>
//       <Text style={styles.info}>Description: {item.description}</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           navigation.navigate("ProductDetail", { productId: item._id });
//         }}
//       >
//         <Text style={styles.buttonText}>View Details</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return <Text style={styles.loadingText}>Loading...</Text>;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>{error}</Text>;
//   }

//   return (
//     <FlatList
//       data={products}
//       keyExtractor={(item) => item._id}
//       renderItem={renderProductItem}
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   listContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 15, // Added horizontal padding for better layout
//   },
//   productCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     width: '100%', // Adjusted width to fit the container
//     maxWidth: 300, // Max width to ensure card size consistency
//   },
//   title: {
//     fontSize: 18, // Increased font size for better readability
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   info: {
//     fontSize: 14,
//     marginBottom: 6, // Increased margin for spacing between lines
//     color: "#333",
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: "#007bff",
//     borderRadius: 8,
//     paddingVertical: 12, // Increased padding for better touch area
//     paddingHorizontal: 20, // Increased horizontal padding for better appearance
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   loadingText: {
//     textAlign: "center",
//     fontSize: 16,
//     marginVertical: 20,
//   },
//   errorText: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "red",
//     marginVertical: 20,
//   },
// });

// export default ProductsList;


import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import fetchProfile from "../hook/fetchProfile";
import { LoginContext } from "../context/LoginContext";

import { AntDesign } from "@expo/vector-icons";

import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import RegistrationTile from "../components/RegistrationTile";
import LoadingScreen from "./vendor/LoadingScreen";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const { login, setLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  // const { user, isProfileLoading, error, refetch } = fetchProfile();
  const { isProfileLoading, error, refetch } = fetchProfile();
  console.log("this is user:", user);
  const profile =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";
  const bkImg =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";
  if (isProfileLoading) {
    return <LoadingScreen />;
  }
  return (
    <View>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 80,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <Image
            source={{ uri: bkImg }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: 0.7,
              },
            ]}
          />
          <View style={styles.profile}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <NetworkImage
                data={user === null ? profile : user.profile}
                width={45}
                height={45}
                radius={99}
              />
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <Text style={styles.text}>
                  {user === null ? "Ahhussain" : user.username}
                </Text>
                <Text style={styles.email}>
                  {user === null ? "ahhhussain1234@gmail.com" : user.email}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.setItem("token", "");
                setUser(null);
                setLogin(null);
                navigation.navigate("Profile");
              }}
            >
              <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <RegistrationTile
            heading={"Register as vendor"}
            desc={
              "Join our community and showcase your culinary delights to a wider audience."
            }
            onPress={() => navigation.navigate("registrationPage")}
          />

          <RegistrationTile
            heading={"Show all vendors"}
            desc={"Show all vendors."}
            onPress={() => navigation.navigate("showVendorsPage")}
          />

<RegistrationTile
            heading={"Shop Details"}
            desc={"Vendor Shop Detail"}
            onPress={() => navigation.navigate("shopDetails")}
          />

            {/* <Text
                style={styles.registration}
                onPress={() => {
                  navigation.navigate("shopDetails");
                }}
              >
                {" "}
                shopDetails{" "}
              </Text> */}

          {/* <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Orders"} icon={"fast-food-outline"} font={1} />
            <ProfileTile title={"Places"} icon={"heart"} font={2} />
            <ProfileTile title={"Payment History"} icon={"creditcard"} />
          </View> */}

          {/* <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Coupons"} icon={"tago"} />
            <ProfileTile title={"My Store"} icon={"bag"} font={2} />
            <ProfileTile title={"History"} icon={"globe-outline"} font={1} />
          </View> */}

          {/* <RegistrationTile
            heading={"Join the courier team"}
            desc={
              "Embark on a journey, deliver joy, and earn on your own schedule."
            }
          /> */}

          {/* <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile
              title={"Shipping Address"}
              icon={"location-outline"}
              font={1}
            />
            <ProfileTile title={"Services Center"} icon={"customerservice"} />
            <ProfileTile title={"Settings"} icon={"setting"} />
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: "medium",
    color: COLORS.black,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 60,
  },
});