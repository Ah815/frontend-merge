import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { COLORS } from "../constants/theme";

const VendorRegistrationPage = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    time: Yup.string().required("Time is required"),
    address: Yup.string().required("Address is required"),
    owner: Yup.string().required("Owner is required"),
    pickup: Yup.boolean(),
    delivery: Yup.boolean(),
    rating: Yup.number()
      .min(1, "Rating must be between 1 and 5")
      .max(5, "Rating must be between 1 and 5")
      .nullable(),
    products: Yup.array().of(Yup.string()).nullable(),
  });

  // Function to make vendor request
  const makeVendorRequest = async () => {
    try {
      const bToken = await AsyncStorage.getItem("token");
      const endpoint =
        "https://store-backend-sage.vercel.app/api/vendors/makeVendor";
      const response = await axios.post(
        endpoint,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Function to handle form submission
  const addVendorRequest = async (values) => {
    setLoader(true);
    try {
      const bToken = await AsyncStorage.getItem("token");

      if (!bToken) {
        Alert.alert("Error", "No token found. Please log in again.");
        setLoader(false);
        return;
      }

      const makeVendorResponse = await makeVendorRequest();
      if (!makeVendorResponse) {
        Alert.alert("Error", "Error in making user type vendor");
        setLoader(false);
        return;
      }

      const endpoint =
        "https://store-backend-sage.vercel.app/api/vendors/addVendor";
      const response = await axios.post(endpoint, values, {
        headers: {
          Authorization: `Bearer ${bToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Vendor added successfully");
        navigation.navigate("shopDetails");
      } else {
        Alert.alert("Error", "Failed to register vendor. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        time: "",
        address: "",
        owner: "",
        pickup: true,
        delivery: true,
        rating: "",
        products: [], // Initialize as an array
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => addVendorRequest(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
          />
          {errors.title && touched.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}

          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("time")}
            onBlur={handleBlur("time")}
            value={values.time}
          />
          {errors.time && touched.time && (
            <Text style={styles.errorText}>{errors.time}</Text>
          )}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
            value={values.address}
          />
          {errors.address && touched.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}

          <Text style={styles.label}>Owner</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("owner")}
            onBlur={handleBlur("owner")}
            value={values.owner}
          />
          {errors.owner && touched.owner && (
            <Text style={styles.errorText}>{errors.owner}</Text>
          )}

          <Text style={styles.label}>Pickup</Text>
          <Switch
            value={values.pickup}
            onValueChange={(value) => setFieldValue("pickup", value)}
          />

          <Text style={styles.label}>Delivery</Text>
          <Switch
            value={values.delivery}
            onValueChange={(value) => setFieldValue("delivery", value)}
          />

          <Text style={styles.label}>Rating</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
            keyboardType="numeric"
          />
          {errors.rating && touched.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <Text style={styles.label}>Products (comma-separated)</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setFieldValue(
                "products",
                text.split(",").map((item) => item.trim())
              )
            }
            onBlur={handleBlur("products")}
            value={values.products.join(", ")}
          />
          {errors.products && touched.products && (
            <Text style={styles.errorText}>{errors.products}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, loader && styles.buttonDisabled]}
            disabled={loader}
          >
            <Text style={styles.buttonText}>
              {loader ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Light gray when disabled
  },
});

export default VendorRegistrationPage;
