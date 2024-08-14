import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://store-backend-sage.vercel.app/api/products/getAllProducts`
      ); // Assuming this endpoint returns all products
      setAllProducts(response.data.products);
      setSearchResults(response.data.products);
    } catch (error) {
      console.log("Failed to get products", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search key
  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      product.description.toLowerCase().includes(searchKey.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [searchKey, allProducts]);

  const renderProductItem = ({ item }) => (
    <View style={styles.tile}>
      <View>
        <Text style={styles.title}>{item.description}</Text>
        <Text style={styles.info}>Price: ${item.price}</Text>
        <Text style={styles.info}>Description: {item.description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 40,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.input}
                value={searchKey}
                onChangeText={setSearchKey}
                placeholder="Search for products..."
              />
            </View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => {
                /* Optional: Handle search button press */
              }}
            >
              <Feather name="search" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text>Loading...</Text>
            </View>
          ) : searchResults.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text>No products found</Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item._id}
              renderItem={renderProductItem}
              contentContainerStyle={{ paddingBottom: height * 0.1 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  searchWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  searchBtn: {
    marginLeft: 10,
  },
  tile: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: width * 0.04,
    marginBottom: 6,
    color: "#333",
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
