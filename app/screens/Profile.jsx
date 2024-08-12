import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ProductsList = ({ navigation }) => {
  const [products, setProducts] = useState([]); // Correct state variable name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { vendorId } = route.params;

  // Fetch products data from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://store-backend-sage.vercel.app/api/products/getProducts/${vendorId}`
      ); // Adjust URL as needed
      console.log("Fetched products:", response.data);
      setProducts(response.data.products); // Use setProducts to update state
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [vendorId]);

  // Render individual product item
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.info}>Price: ${item.price}</Text>
      <Text style={styles.info}>Description: {item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ProductDetail", { productId: item._id });
        }}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderProductItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15, // Added horizontal padding for better layout
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%', // Adjusted width to fit the container
    maxWidth: 300, // Max width to ensure card size consistency
  },
  title: {
    fontSize: 18, // Increased font size for better readability
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 6, // Increased margin for spacing between lines
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12, // Increased padding for better touch area
    paddingHorizontal: 20, // Increased horizontal padding for better appearance
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginVertical: 20,
  },
});

export default ProductsList;
