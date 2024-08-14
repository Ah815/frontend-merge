import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ProductsList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { vendorId } = route.params;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://store-backend-sage.vercel.app/api/products/getProducts/${vendorId}`
        );
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          Alert.alert("Error", response.data.message);
        }
      } catch (err) {
        setError(err.message);
        Alert.alert("Error", "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [vendorId]);

  // Handle edit and delete actions
  const handleEdit = (productId) => {
    // Logic to navigate to the edit screen
    Example: navigation.navigate("UpdateProduct", { productId });
    // Alert.alert("Edit", `Edit product with ID: ${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://store-backend-sage.vercel.app/api/products/deleteProduct/${productId}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      Alert.alert("Success", "Product deleted successfully");
    } catch (err) {
      Alert.alert("Error", "Failed to delete product.");
    }
  };

  // Render product item
  
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEdit(item._id)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item._id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProduct}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5, // Elevated shadow for a modern look
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productDetails: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  productDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3498db",
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#3498db", // Blue for edit button
  },
  deleteButton: {
    backgroundColor: "#e74c3c", // Red for delete button
  },
  buttonText: {
    color: "#ffffff", // White text color for buttons
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProductsList;
