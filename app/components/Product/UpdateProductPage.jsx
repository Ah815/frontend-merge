import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a number"),
});

const UpdateProduct = () => {
  const [product, setProduct] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      const vendorId = await AsyncStorage.getItem("vendorID");
      try {
        const response = await axios.get(
          `https://store-backend-sage.vercel.app/api/products/getProduct/${productId}`
        );
        if (response.data.success) {
          setProduct(response.data.product);
          setImageUri(response.data.product.imageUrl);
        } else {
          Alert.alert("Error", response.data.message);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [productId]);

  const pickImage = async () => {
    setLoading(true);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setLoading(false);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    } else {
      Alert.alert("No Image Selected", "You did not select an image.");
    }
  };

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
        return response.data.secure_url;
      }
    } catch (error) {
      Alert.alert("Upload Error", "Failed to upload image.");
    }
  };

  const handleSubmit = async (values) => {
    const { description, price } = values;
    const imageUrl = imageUri ? await uploadImage(imageUri) : product.imageUrl;

    try {
      const response = await axios.put(
        `https://store-backend-sage.vercel.app/api/products/updateProduct/${productId}`,
        {
          description,
          price,
          imageUrl,
        }
      );

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        navigation.navigate("ProductsPage", { vendorId: vendorId });
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Submission Error", "Failed to update product.");
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Update Product</Text>

      <Formik
        initialValues={{
          description: product.description,
          price: product.price.toString(),
        }}
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
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34495e",
    marginLeft: 15,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#BDC3C7",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#2c3e50",
  },
  errorText: {
    color: "#e74c3c",
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
    borderColor: "#BDC3C7",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  loaderContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});

export default UpdateProduct;
