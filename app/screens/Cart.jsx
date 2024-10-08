import React, { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PaymentModal from "../components/PaymentModal";
import { CartContext } from "../context/CartContext";

const Cart = ({ navigation }) => {
  const { carts, removeFromCart, emptyCart } = useContext(CartContext);

  const [paymentModal, setPaymentModal] = useState(false);
  console.log("this is cart", carts);

  if (!carts) {
    return <Text>Loading...</Text>; // Handle loading or context not available
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.description}</Text>
        <Text style={styles.itemPrice}>rs {item.price}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          console.log("item", item);
          removeFromCart(item);
        }}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    setPaymentModal(true);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {carts.length > 0 ? (
            <>
              <FlatList
                data={carts}
                renderItem={renderItem}
                keyExtractor={(item) => item._id} // Ensure keyExtractor converts id to string
              />
              <Text style={styles.total}>
                Total: $
                {carts
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.emptyMessage}>Your cart is empty.</Text>
          )}
        </View>
      </SafeAreaView>
      <PaymentModal
        modalVisible={paymentModal}
        setModalVisible={() => {
          setPaymentModal(false);
          emptyCart();
          navigation.navigate("Home");
          Alert.alert(
            "Once you send receipt at our email, your order will be in processed"
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60, // Adjust size as needed
    height: 60, // Adjust size as needed
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#333",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});

export default Cart;
