// import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
// import React, { useContext } from "react";
// import { COLORS, SIZES } from "../constants/theme";
// import NetworkImage from "./NetworkImage";
// import { RatingInput } from "react-native-stock-star-rating";
// import { CartContext } from "../context/CartContext";

// const StoreComponent = ({ item, onPress }) => {
//   const { addToCart } = useContext(CartContext);
//   const handleAddToCart = () => {
//     addToCart(item); // Add item to cart
//   };
//   return (
//     <TouchableOpacity style={styles.wrapper} onPress={onPress}>
//       <NetworkImage
//         data={item.imageUrl}
//         width={SIZES.width - 80}
//         height={SIZES.height / 5.8}
//         radius={16}
//         mode={"cover"}
//       />
//       <Text style={styles.heading}>{item.description}</Text>
//       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//         <Text style={styles.small}>Price: {item.price}</Text>

//         <TouchableOpacity>
//           <Text onPress={handleAddToCart}>Add To Cart</Text>
//         </TouchableOpacity>

//         {/* <Text style={styles.small}>Delivery Time</Text> */}
//         {/* <Text style={styles.small}>{item.time}</Text> */}
//       </View>

//       {/* <View style={{ flexDirection: "row" , justifyContent:'space-between'}}>
//         <RatingInput
//         rating={item.ratring}
//         size={14}
//         maxStars={5}
//         setRating={item.rating}
//         bordered={false}
//         color={COLORS.primary}

//         />
//         <Text style={styles.small}>{item.ratingCount}+ ratings</Text>
//       </View> */}
//     </TouchableOpacity>
//   );
// };

// export default StoreComponent;

// const styles = StyleSheet.create({
//   wrapper: {
//     marginRight: 15,
//     backgroungColor: COLORS.lightWhite,
//     padding: 8,
//     borderRadius: 16,
//   },
//   heading: {
//     fontSize: 14,
//     fontFamily: "regular",
//     color: COLORS.gray,
//   },
//   small: {
//     fontSize: 12,
//     fontFamily: "regular",
//     color: COLORS.gray,
//   },
// });

import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../constants/theme";
import NetworkImage from "./NetworkImage";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const StoreComponent = ({ item, onPress }) => {
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  // Function to handle adding the item to the cart
  const handleAddToCart = () => {
    console.log("Adding to cart:", item); // Log item details
    addToCart(item);
    navigation.navigate("Cart");
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <NetworkImage
        data={item.imageUrl}
        width={SIZES.width - 80}
        height={SIZES.height / 5.8}
        radius={16}
        mode={"cover"}
      />
      <Text style={styles.heading}>{item.description}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.small}>Price: rs{item.price.toFixed(2)}</Text>

        <TouchableOpacity onPress={handleAddToCart}>
          <Text style={styles.addToCart}>Add To Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Optional Rating and other info */}
      {/* <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <RatingInput 
          rating={item.rating}
          size={14}
          maxStars={5}
          setRating={item.setRating}
          bordered={false}
          color={COLORS.primary}
        />
        <Text style={styles.small}>{item.ratingCount}+ ratings</Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    backgroundColor: COLORS.lightWhite, // Fixed typo here
    padding: 8,
    borderRadius: 16,
  },
  heading: {
    fontSize: 20,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  small: {
    fontSize: 15,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  addToCart: {
    color: COLORS.primary, // Optional: Style for the "Add To Cart" text
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default StoreComponent;
