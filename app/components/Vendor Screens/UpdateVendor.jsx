import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateVendorForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    imageUrl: "",
    isAvailable: false,
    address: "",
    delivery: false,
    pickup: false,
    owner: "",
    products: [],
    rating: 0,
    ratingCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRoute();

  const { id } = route.params;
  console.log("this is id from route:", id);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const endpoint = `https://store-backend-sage.vercel.app/api/vendors/getVendor/${id}`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 && response.data.status) {
          setFormData(response.data.vendor);
        } else {
          Alert.alert(
            "Error",
            response.data.message || "Failed to fetch vendor."
          );
        }
      } catch (error) {
        console.error("Error fetching vendor:", error);
        setError("Failed to fetch vendor details.");
      }
    };

    fetchVendor();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = `https://store-backend-sage.vercel.app/api/vendors/updateVendor/${id}`;
      const response = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Vendor updated successfully.");
        navigation.goBack(); // Navigate back after success
      } else {
        Alert.alert("Error", "Failed to update vendor. Please try again.");
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      setError("Failed to update vendor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Vendor</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={formData.title}
        onChangeText={(text) => handleChange("title", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={formData.time}
        onChangeText={(text) => handleChange("time", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={formData.imageUrl}
        onChangeText={(text) => handleChange("imageUrl", text)}
      />
      <View style={styles.switchContainer}>
        <Text>Is Available:</Text>
        <Switch
          value={formData.isAvailable}
          onValueChange={(value) => handleChange("isAvailable", value)}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Owner"
        value={formData.owner}
        onChangeText={(text) => handleChange("owner", text)}
      />
      <View style={styles.switchContainer}>
        <Text>Pickup:</Text>
        <Switch
          value={formData.pickup}
          onValueChange={(value) => handleChange("pickup", value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Delivery:</Text>
        <Switch
          value={formData.delivery}
          onValueChange={(value) => handleChange("delivery", value)}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={formData.rating.toString()}
        onChangeText={(text) => handleChange("rating", Number(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rating Count"
        value={formData.ratingCount.toString()}
        onChangeText={(text) => handleChange("ratingCount", Number(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Products (comma-separated)"
        value={formData.products.join(", ")}
        onChangeText={(text) =>
          handleChange(
            "products",
            text.split(",").map((p) => p.trim())
          )
        }
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        title={loading ? "Updating Vendor..." : "Update Vendor"}
        onPress={handleSubmit}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default UpdateVendorForm;
