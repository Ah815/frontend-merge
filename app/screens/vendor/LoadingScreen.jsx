import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/theme";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.offwhite,
  },
  text: {
    marginTop: 10,
    color: COLORS.gray,
    fontSize: 16,
  },
});

export default LoadingScreen;
