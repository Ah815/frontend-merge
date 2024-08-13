import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation hook
  const navigation = useNavigation();

  // Fetch vendor data from API
  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        "https://store-backend-sage.vercel.app/api/vendors/getVendors"
      ); // Adjust URL as needed
      console.log(response.data.vendors);
      setVendors(response.data.vendors); // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setError("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Render individual vendor item
  const renderVendorItem = ({ item }) => (
    <View style={styles.vendorCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.info}>Address: {item.address}</Text>
      <Text style={styles.info}>
        Pickup Available: {item.pickup ? "Yes" : "No"}
      </Text>
      <Text style={styles.info}>
        Delivery Available: {item.delivery ? "Yes" : "No"}
      </Text>
      <Text style={styles.info}>
        Rating: {item.rating} ({item.ratingCount} ratings)
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ProductsListPage", { vendorId: item._id });
        }}
      >
        <Text style={styles.buttonText}>Show Products</Text>
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
    <View style={styles.container}>
      <FlatList
        horizontal
        data={vendors}
        keyExtractor={(item) => item._id}
        renderItem={renderVendorItem}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => {
          fetchVendors();
        }}
      >
        <Text style={styles.refreshButtonText}>Refresh Vendors</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    paddingVertical: 10,
  },
  vendorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 250, // Fixed width to ensure consistent card size in horizontal list
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  refreshButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VendorList;
