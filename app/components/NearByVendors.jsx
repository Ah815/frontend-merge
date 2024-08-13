// import { FlatList, StyleSheet, Text, View } from "react-native";
// import React, { useContext, useState } from "react";
// import uidata from "../constants/uidata";
// import StoreComponent from "./StoreComponent";
// import { useNavigation } from "@react-navigation/native";
// import { VendorContext } from "../context/VendorContext";

// const NearByVendors = () => {
//   const navigation = useNavigation();
//   const { vendorObj, setVendorObj } = useContext(VendorContext);
//   const [products,setProducts] = useState([])

//   const getAllProductsFromDB = async () => {
//     try {
//       const response = await axios.get('https://store-backend-sage.vercel.app/api/products/getAllProducts'); // Replace with your actual API endpoint
//       console.log('response data', response.data)
//       return response.data; // Return the data from the response
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       // Handle error or return an appropriate value
//       return null;
//     }
//   };

//   return (
//     // <View style={{ marginLeft: 12 }}>
//     //   <FlatList
//     //     data={uidata.vendors}
//     //     horizontal
//     //     showsHorizontalScrollIndicator={false}
//     //     style={{ marginTop: 5, rowGap: 10 }}
//     //     scrollEnabled
//     //     renderItem={({ item }) => (
//     //       <StoreComponent item={item} onPress={() => {navigation.navigate('vendor', item), setVendorObj(item)}} />
//     //     )}
//     //   />
//     // </View>
//     <View>
//       <Flatlist
//       data=
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{ marginTop: 5, rowGap: 10 }}
//         scrollEnabled
//         renderItem={({ item }) => (
//           <StoreComponent
//             item={item}
//             onPress={() => {
//               navigation.navigate("vendor", item), setVendorObj(item);
//             }}
//           />
//         )}
//       />
//     </View>
//   );
// };

// export default NearByVendors;

// const styles = StyleSheet.create({});

import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import StoreComponent from "./StoreComponent";
import { useNavigation } from "@react-navigation/native";
import { VendorContext } from "../context/VendorContext";

const NearByVendors = () => {
  const navigation = useNavigation();
  const { vendorObj, setVendorObj } = useContext(VendorContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllProductsFromDB = async () => {
    try {
      const response = await axios.get(
        "https://store-backend-sage.vercel.app/api/products/getAllProducts"
      );
      console.log("response data", response.data);
      setProducts(response.data.products); // Adjust according to your API response structure
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductsFromDB();
  }, []);

  const renderItem = ({ item }) => (
    <StoreComponent
      item={item}
      // onPress={() => {
      //   navigation.navigate("vendor", item);
      //   setVendorObj(item);
      // }}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.list}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()} // Ensure you have a unique key for each item
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            getAllProductsFromDB()
          }}
        >
          <Text>Check for updates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
  },
  list: {
    marginTop: 5,
    rowGap: 10,
  },
});

export default NearByVendors;
