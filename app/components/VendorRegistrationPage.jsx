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
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { COLORS } from "../constants/theme";
import * as ImagePicker from "expo-image-picker";

const VendorRegistrationPage = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const pickImage = async () => {
    setLoading(true); // Start loading

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setLoading(false); // Stop loading

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert("No Image Selected", "You did not select an image.");
    }
  };

  // Function to upload image to Cloudinary
  const uploadImage = async (uri) => {
    try {
      const data = new FormData();
      data.append("file", {
        uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });
      data.append("upload_preset", "avian-med");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dg40bum8b/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.secure_url) {
        console.log("Image URL:", response.data.secure_url);
        return response.data.secure_url; // Return the image URL for use in the form submission
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "Failed to upload image.");
    }
  };

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
    merchantQR: Yup.string().url("Invalid URL").nullable(),
  });

  console.log("user", user);

  // Function to handle form submission
  const addVendorRequest = async (values) => {
    console.log("values ===>", values);

    let { products, ...rest } = values;

    setLoader(true);
    try {
      const bToken = await AsyncStorage.getItem("token");
      console.log("bToken", bToken);

      if (!bToken) {
        Alert.alert("Error", "No token found. Please log in again.");
        setLoader(false);
        return;
      }

      const endpoint =
        "https://store-backend-sage.vercel.app/api/vendors/addVendor";
      const response = await axios.post(endpoint, rest, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Vendor added successfully");
        navigation.navigate("shopDetails", {
          data: values,
        });
      } else {
        Alert.alert("Error", "Failed to register vendor. Please try again.");
      }
    } catch (error) {
      console.log("error ===>", JSON.stringify(error));
      navigation.navigate("shopDetails", {
        data: values,
      });
      // Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={styles.header}>Vendor Registration</Text>
            <Text style={styles.label}>Vendor</Text>
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

            {/* <Text style={styles.label}>Rating</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              value={values.rating}
              keyboardType="numeric"
            />
            {errors.rating && touched.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )} */}

            {/* Display selected image */}
            {/* {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )} */}

            {/* <TouchableOpacity
              onPress={pickImage}
              style={styles.button}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Loading..." : "Pick Image"}
              </Text>
            </TouchableOpacity> */}

            {/* <Text style={styles.label}>Products (comma-separated)</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              // setFieldValue(ws
              //   "products",
              //   text.split(",").map((item) => item.trim())
              // )
            }
            onBlur={handleBlur("products")}
            value={values.products.join(", ")}
          />
          {errors.products && touched.products && (
            <Text style={styles.errorText}>{errors.products}</Text>
          )}  */}

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default VendorRegistrationPage;
