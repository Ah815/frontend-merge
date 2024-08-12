// import { FlatList, StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import uidata from "../constants/uidata";
// import FoodComponent from "./FoodComponent";
// import { useNavigation } from "@react-navigation/native";

// const NewFoodList = () => {
//   cosnt[(getAllVendors, setVendors)] = useState([]);
//   const getAllVendors = async () => {
//     try {
//       const response = await axios.get(
//         "https://store-backend-sage.vercel.app/api/products/getAllProducts"
//       );
//       console.log("response data", response.data);
//       setProducts(response.data.products); // Adjust according to your API response structure
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to load products");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllVendors();
//   }, []);

//   const navigation = useNavigation();
//   const renderItem = ({ item }) => (
//     <FoodComponent
//       item={item}
//       //  onPress={()=> navigation.navigate('food-nav', item)}
//     />
//   );
//   return (
//     <View style={{ marginLeft: 12, marginBottom: 10 }}>
//       <FlatList
//         data={uidata.foods}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{ marginTop: 5, rowGap: 10 }}
//         scrollEnabled
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default NewFoodList;

// const styles = StyleSheet.create({});

// import React, { useState, useEffect } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";
// import axios from "axios"; // Make sure to import axios
// import FoodComponent from "./FoodComponent";
// import { useNavigation } from "@react-navigation/native";

// const NewFoodList = () => {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getAllVendors = async () => {
//     try {
//       const response = await axios.get(
//         "https://store-backend-sage.vercel.app/api/vendors/getVendors"
//       );
//       console.log("response data", response.data);
//       setVendors('this is get vendors:',response.data.vendors); // Adjust according to your API response structure
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to load products");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllVendors();
//   }, []);

//   const navigation = useNavigation();
//   const renderItem = ({ item }) => (
//     <FoodComponent
//       item={item}
//       // Uncomment if you want to navigate on press
//       // onPress={() => navigation.navigate('food-nav', { item })}
//     />
//   );

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <View style={{ marginLeft: 12, marginBottom: 10 }}>
//       <FlatList
//         data={vendors}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{ marginTop: 5, rowGap: 10 }}
//         scrollEnabled
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id} // Adjust keyExtractor as needed
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default NewFoodList;


import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodComponent from "./FoodComponent";
import { useNavigation } from "@react-navigation/native";

const NewFoodList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://store-backend-sage.vercel.app/api/products/getAllProducts"
      );
      setProducts(response.data.products); // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <FoodComponent
      item={item}
      onPress={() => navigation.navigate('food-nav', item)}
    />
  );

  return (
    <View style={{ marginLeft: 12, marginBottom: 10 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id} // Ensure unique keys
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 5, rowGap: 10 }}
          scrollEnabled
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default NewFoodList;

const styles = StyleSheet.create({});
