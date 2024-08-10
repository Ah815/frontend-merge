// import React, { useState } from "react";
// import { View, Button, Image, StyleSheet, Alert } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// const UploadImage = () => {
//   const [imageUri, setImageUri] = useState(null);

//   // Function to pick image from gallery
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//       uploadImage(result.assets[0].uri);
//     }
//   };

//   // Function to upload image to Cloudinary
//   const uploadImage = async (uri) => {
//     try {
//       const data = new FormData();
//       data.append("file", {
//         uri,
//         type: "image/jpeg", // or the type of the image
//         name: "photo.jpg", // or the name of the image file
//       });
//       data.append("upload_preset", "avian-med"); // replace with your upload preset

//       const response = await axios.post(
//         "CLOUDINARY_URL=cloudinary://675996725938951:g7PPJDAm7VzqPdSeTl4jqruW2p0@dg40bum8b",
//         data
//       );

//       if (response.data.secure_url) {
//         console.log("Image URL:", response.data.secure_url);
//         saveImageUrlToDatabase(response.data.secure_url);
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       Alert.alert("Upload Error", "Failed to upload image.");
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from gallery" onPress={pickImage} />
//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//     borderRadius: 10,
//   },
// });

// export default UploadImage;


import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const UploadImage = () => {
  const [imageUri, setImageUri] = useState(null);

  // Function to pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  // Function to upload image to Cloudinary
  const uploadImage = async (uri) => {
    try {
      const data = new FormData();
      data.append("file", {
        uri,
        type: "image/jpeg", // or the type of the image
        name: "photo.jpg", // or the name of the image file
      });
      data.append("upload_preset", "avian-med"); // replace with your upload preset

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dg40bum8b/image/upload`, // replace <cloud_name> with your Cloudinary cloud name
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.secure_url) {
        console.log("Image URL:", response.data.secure_url);
        saveImageUrlToDatabase(response.data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "Failed to upload image.");
    }
    };

  // Dummy function to save the image URL to database
  const saveImageUrlToDatabase = (url) => {
    // Implement your logic to save the URL to the database
    console.log("Saving image URL to database:", url);
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default UploadImage;
