import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

// assets

// redux

//ref

const SuccessModal = ({ modalVisible, setModalVisible }) => {
  //redux

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: "rgba(255,255,255,0.9)",
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.crossCont}
          onPress={setModalVisible}
        >
          <Text style={styles.txt3}>X</Text>
        </TouchableOpacity>
        <Text style={styles.txt1}>Scan this QR Code for payment</Text>
        <Image
          source={require("../../assets/QRCode.jpeg")}
          style={styles.imgStyleCont}
          resizeMode="contain"
        />
        <Text style={styles.txt2}>
          Complete this payment and send the receipt at aat@yopmail.com
        </Text>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    padding: width * 0.04,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.92,
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: width * 0.04,
    paddingVertical: height * 0.1,
  },
  iconCont: {
    width: width * 0.24,
    height: width * 0.24,
    marginRight: width * 0.02,
  },
  txt1: {
    fontSize: width * 0.045,
    textTransform: "capitalize",
    color: "black",
    marginVertical: height * 0.01,
  },
  txt2: {
    fontSize: width * 0.04,
    color: "black",
    textAlign: "center",
  },
  imgStyleCont: {
    width: width * 0.7,
    height: width * 0.7,
  },
  crossCont: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: "red",
    borderRadius: width / 2,
    position: "absolute",
    top: 80,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  txt3: {
    fontSize: width * 0.06,
    color: "white",
    fontWeight: "bold",
  },
});
