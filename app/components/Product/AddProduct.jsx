import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator for the loader
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a number"),
  quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .positive("Quantity must be a positive number")
    .typeError("Quantity must be a number"),
});

const AddProduct = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to pick image from gallery
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
      uploadImage(result.assets[0].uri);
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

  const handleSubmit = async (values) => {
    const { description, price, quantity } = values;
    const imageUrl = imageUri ? await uploadImage(imageUri) : null; // Upload image and get the URL

    try {
      const response = await axios.post(
        "https://store-backend-sage.vercel.app/api/products/addProduct",
        {
          description,
          price,
          quantity,
          imageUrl,
        }
      );

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      Alert.alert("Submission Error", "Failed to add product.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      <Formik
        initialValues={{ description: "", price: "", quantity: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
              {errors.description && touched.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
              />
              {errors.price && touched.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange("quantity")}
                onBlur={handleBlur("quantity")}
                value={values.quantity}
              />
              {errors.quantity && touched.quantity && (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick an image from gallery</Text>
            </TouchableOpacity>

            {loading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3498db" />
              </View>
            )}

            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8", // Light blue-gray background for a fresh look
  },
  title: {
    fontSize: 28,
    fontWeight: "700", // Bold font weight for emphasis
    color: "#2c3e50", // Dark blue-gray for the title
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7", // Soft gray border
    backgroundColor: "#ffffff", // White background for inputs
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34495e", // Darker text color for labels
    marginLeft: 15,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#BDC3C7",
    borderBottomWidth: 1, // Underline style for input fields
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#2c3e50", // Dark blue-gray text color
  },
  errorText: {
    color: "#e74c3c", // Red color for error messages
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#BDC3C7", // Soft gray border around the image
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#3498db", // Bright blue background for buttons
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#ffffff", // White text color for buttons
    fontSize: 16,
    fontWeight: "600",
  },
  loaderContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});

export default AddProduct;
