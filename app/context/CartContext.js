// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// import React, { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {  // Fixed typo here
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    loadCardItems();
  }, []);

  const loadCardItems = async () => {
    let carts = await AsyncStorage.getItem("carts");
    carts = carts ? JSON.parse(carts) : [];
    setCarts(carts);
  };

  // const addToCart = (item) => {
  //   const itemExist = carts.findIndex((cart) => cart.id === item._id);
  //   if (itemExist === -1) {
  //     setCarts([...carts, item]);
  //   }
  // };

  // const addToCart = (item) => {
  //   // Find the index of the item in the cart
  //   const itemIndex = carts.findIndex((cart) => cart._id === item._id);

  //   if (itemIndex === -1) {
  //     // Item does not exist in the cart, add it with initial quantity of 1
  //     setCarts([...carts, { ...item, quantity: 1 }]);
  //   } else {
  //     // Item exists, update the quantity
  //     const updatedCarts = carts.map((cart) =>
  //       cart._id === item._id ? { ...cart, quantity: cart.quantity + 1 } : cart
  //     );
  //     setCarts(updatedCarts);
  //   }
  // };

  // const addToCart = async (item) => {
  //   const itemExist = carts.findIndex((cart) => cart._id === item._id);
  //   if (itemExist === -1) {
  //     const newCartItems = [...carts, item];
  //     await AsyncStorage.setItem("carts", JSON.stringify(newCartItems));
  //     setCarts(newCartItems);
  //   }
  // };

  const addToCart = async (item) => {
    // Check if the item is already in the cart
    const itemIndex = carts.findIndex((cart) => cart._id === item._id);

    if (itemIndex === -1) {
      // Item does not exist in the cart, add it with initial quantity of 1
      const newItem = { ...item, quantity: 1 };
      const newCartItems = [...carts, newItem];
      await AsyncStorage.setItem("carts", JSON.stringify(newCartItems));
      setCarts(newCartItems);
    } else {
      // Item exists, update the quantity
      const updatedCarts = carts.map((cart) =>
        cart._id === item._id ? { ...cart, quantity: cart.quantity + 1 } : cart
      );
      await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
      setCarts(updatedCarts);
    }
  };

  // const removeFromCart = async (item) => {
  //   const newItems = carts.filter((cart) => cart._id !== item._id);
  //   setCarts(newItems);
  //   await AsyncStorage.setItem("carts", JSON.stringify(newItems));
  // };

  // const removeFromCart = async (item) => {
  //   // Filter out the item to be removed
  //   const newItems = carts.filter((cart) => cart._id !== item._id);

  //   // Update the state with the new cart items
  //   setCarts(newItems);

  //   // Persist the updated cart to AsyncStorage
  //   await AsyncStorage.setItem("carts", JSON.stringify(newItems));
  // };

  const removeFromCart = async (item) => {
    // Find the index of the item in the cart
    const itemIndex = carts.findIndex((cart) => cart._id === item._id);

    if (itemIndex === -1) return; // Item is not in the cart, do nothing

    // Check the quantity of the item
    const cartItem = carts[itemIndex];
    if (cartItem.quantity > 1) {
      // Reduce the quantity by 1
      const updatedCarts = carts.map((cart) =>
        cart._id === item._id ? { ...cart, quantity: cart.quantity - 1 } : cart
      );
      await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
      setCarts(updatedCarts);
    } else {
      // Remove the item from the cart
      const newItems = carts.filter((cart) => cart._id !== item._id);
      await AsyncStorage.setItem("carts", JSON.stringify(newItems));
      setCarts(newItems);
    }
  };

  const emptyCart = async () => {
    await AsyncStorage.setItem("carts", JSON.stringify([]));
    setCarts([]);
  };

  const value = { carts, addToCart, removeFromCart, emptyCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
