import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Button from "../Button";
import { COLORS } from "../../constants/theme";

const VendorShopDetail = ({navigation}) => {
  const { user } = useContext(UserContext);
  const [vendors, setVendors] = useState([]);

  // Function to fetch vendors
  const getVendors = async () => {
    try {
      const endpoint =
        "https://store-backend-sage.vercel.app/api/vendors/getVendors";
      const response = await axios.get(endpoint);
      const allVendors = response.data.vendors;
      const filteredResponse =
        user.userType === "Admin"
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
          <View key={index} style={styles.vendorCard}>
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorTitle}>{vendor.title}</Text>
              <Text style={styles.vendorTime}>{vendor.time}</Text>
              <Text style={styles.vendorRating}>
                Rating: {vendor.rating} ({vendor.ratingCount} reviews)
              </Text>
            </View>
            <View style={styles.vendorDetails}>
              <Text style={styles.detailLabel}>Products:</Text>
              <Text style={styles.detailValue}>
                {vendor.products?.length > 0
                  ? vendor.products.join(", ")
                  : "No products available"}
              </Text>
              <View>
                <Button onPress={() => navigation.navigate('addProduct')}
                 style={styles.button}
                  title={`add product`}
                ></Button>
              </View>

              <Text style={styles.detailLabel}>Pickup:</Text>
              <Text style={styles.detailValue}>
                {vendor.pickup ? "Yes" : "No"}
              </Text>

              <Text style={styles.detailLabel}>Delivery:</Text>
              <Text style={styles.detailValue}>
                {vendor.delivery ? "Yes" : "No"}
              </Text>

              <Text style={styles.detailLabel}>Owner:</Text>
              <Text style={styles.detailValue}>{vendor.owner}</Text>

              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detailValue}>{vendor.address}</Text>
            </View>
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
    backgroundColor: "#f0f0f0", // Light gray background
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  vendorCard: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff", // White background for the content
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Shadow effect
  },
  vendorInfo: {
    marginBottom: 10,
  },
  vendorTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  vendorTime: {
    fontSize: 16,
    color: "#aaa",
  },
  vendorRating: {
    fontSize: 14,
    color: "#aaa",
  },
  vendorDetails: {
    // No specific styles needed here
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  section: {
    alignItems: "center",
    marginTop: 20,
  },
  value: {
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
  },
  
});

export default VendorShopDetail;
