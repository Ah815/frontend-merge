import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const VendorShopDetail = () => {
  const { user } = useContext(UserContext);
  const [vendors, setVendors] = useState([]);

  // Function to fetch vendors
  const getVendors = async () => {
    try {
      const endpoint =
        "https://store-backend-sage.vercel.app/api/vendors/getVendors";
      const response = await axios.get(endpoint);
      const allVendors = response.data.vendors;
      const filteredResponse = user.userType === "Admin"
        ? allVendors
        : allVendors.filter((elem) => elem.userId === user._id);

      setVendors(filteredResponse);
    } catch (error) {
      console.log("Error fetching vendors:", error);
    }
  };

  // Fetch vendors when the component mounts
  useEffect(() => {
    getVendors();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Vendor Details</Text>
      </View>

      {vendors.length > 0 ? (
        vendors.map((vendor, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{vendor.title}</Text>

            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{vendor.time}</Text>

            <Text style={styles.label}>Products:</Text>
            <Text style={styles.value}>
              {vendor.products?.length > 0
                ? vendor.products.join(", ")
                : "No products available"}
            </Text>

            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.value}>{vendor.pickup ? "Yes" : "No"}</Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{vendor.address}</Text>

            <Text style={styles.label}>Delivery:</Text>
            <Text style={styles.value}>{vendor.delivery ? "Yes" : "No"}</Text>

            <Text style={styles.label}>Owner:</Text>
            <Text style={styles.value}>{vendor.owner}</Text>

            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.value}>{vendor.rating}</Text>

            <Text style={styles.label}>Rating Count:</Text>
            <Text style={styles.value}>{vendor.ratingCount}</Text>
          </View>
        ))
      ) : (
        <View style={styles.section}>
          <Text style={styles.value}>No vendor details available.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    backgroundColor: "#6200EE",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
});

export default VendorShopDetail;
