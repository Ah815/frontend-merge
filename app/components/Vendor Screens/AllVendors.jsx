// import React, { useEffect, useState } from "react";
// import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function AllVendors({ navigation }) {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getVendors = async () => {
//     try {
//       const endpoint =
//         "https://store-backend-sage.vercel.app/api/vendors/getVendors";
//       const response = await axios.get(endpoint);
//       console.log("Vendors response:", response.data);
//       setVendors(response.data.vendors);
//     } catch (error) {
//       console.log("Error fetching vendors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteVendor = async (vendorId) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const endpoint = `https://store-backend-sage.vercel.app/api/vendors/deleteVendor/${vendorId}`;
//       const response = await axios.delete(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data.status) {
//         console.log("Vendor deleted successfully");
//         setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
//       } else {
//         console.log("Failed to delete vendor:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting vendor:", error);
//     }
//   };

//   useEffect(() => {
//     getVendors();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View>
//       <Text>Vendors List</Text>
//       <FlatList
//         data={vendors}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item.title}</Text>
//             <Button title="Delete" onPress={() => deleteVendor(item._id)} />
//             <Button
//               title="Edit"
//               onPress={() => {
//                 navigation.navigate("UpdateVendor", { id: item._id });
//               }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// }


import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllVendors({ navigation }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVendors = async () => {
    try {
      const endpoint =
        "https://store-backend-sage.vercel.app/api/vendors/getVendors";
      const response = await axios.get(endpoint);
      console.log("Vendors response:", response.data);
      setVendors(response.data.vendors);
    } catch (error) {
      console.log("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVendor = async (vendorId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = `https://store-backend-sage.vercel.app/api/vendors/deleteVendor/${vendorId}`;
      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        console.log("Vendor deleted successfully");
        setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      } else {
        console.log("Failed to delete vendor:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vendors List</Text>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.vendorCard}>
            <Text style={styles.vendorTitle}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Delete"
                onPress={() => deleteVendor(item._id)}
                color="#FF6F61"
              />
              <Button
                title="Edit"
                onPress={() => {
                  navigation.navigate("UpdateVendor", { id: item._id });
                }}
                color="#007BFF"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  vendorCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  vendorTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
