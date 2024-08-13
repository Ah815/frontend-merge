import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import NetworkImage from "../NetworkImage";
import { SIZES } from "../../constants/theme";
import { CartContext } from "../../context/CartContext";

const ProductsList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { vendorId } = route.params;

  // Fetch products data from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://store-backend-sage.vercel.app/api/products/getProducts/${vendorId}`
      );
      console.log("Fetched products:", response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const { addToCart } = useContext(CartContext);

  // Function to handle adding the item to the cart
  const handleAddToCart = (item) => {
    console.log("Adding to cart:", item); // Log item details
    addToCart(item); // Add item to cart
  };

  // Render individual product item
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <NetworkImage
        data={item.imageUrl}
        width={SIZES.width - 80}
        height={SIZES.height / 5.8}
        radius={16}
        mode={"cover"}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.info}>Price: ${item.price}</Text>
      <Text style={styles.info}>Description: {item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    width: "100%", // Ensure the card takes the full width of the container
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#28a745", // Green color for 'Add to Cart'
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
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
