import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const VendorShopDetail = () => {
  const vendor = [
    {
      "_id": "66b6390df6d9c8ad3be0bf87",
      "userId": "66b503ba307cc6e03ed691f1",
      "title": "New shop",
      "time": "12",
      "products": [
        "H","f","f","f","f","f","f","f","f","f"
      ],
      "pickup": true,
      "address": "Nepa",
      "delivery": false,
      "owner": "Ahmed",
      "isAvailable": true,
      "rating": 1,
      "ratingCount": 0,
      "createdAt": "2024-08-09T15:43:09.792Z",
      "updatedAt": "2024-08-09T15:43:09.792Z",
      "__v": 0
    }
  ];

  const vendorDetail = vendor[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Vendor Details</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{vendorDetail.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{vendorDetail.time}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Products:</Text>
        <Text style={styles.value}>
          {vendorDetail.products?.length > 0 
            ? vendorDetail.products.join(', ') 
            : 'No products available'
          }
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Pickup:</Text>
        <Text style={styles.value}>{vendorDetail.pickup ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{vendorDetail.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Delivery:</Text>
        <Text style={styles.value}>{vendorDetail.delivery ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Owner:</Text>
        <Text style={styles.value}>{vendorDetail.owner}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{vendorDetail.rating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Rating Count:</Text>
        <Text style={styles.value}>{vendorDetail.ratingCount}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});

export default VendorShopDetail;
 