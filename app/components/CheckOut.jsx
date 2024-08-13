import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import AssetImage from "./AssetImage";

const CheckOut = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>CheckOut</Text>
//       <Image
//         source={{'../../assets/images/QRscan.jpg'}} // Replace with your image URL
//         style={styles.image}
//       />
//     </View>
//   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200, // Adjust the width
    height: 200, // Adjust the height
    borderRadius: 10, // Optional: add border radius for rounded corners
  },
});

export default CheckOut;
