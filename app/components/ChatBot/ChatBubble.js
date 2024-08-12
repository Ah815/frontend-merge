import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChatBubble = ({ role, text, onSpeech }) => {
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <Icon name="volume-high" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",

  },
  userChatItem: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  modelChatItem: {
    backgroundColor: "#000",
    alignSelf: "flex-start",
  },
  chatText: {
    fontSize: 16,
    color: "#fff",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5
  },
});

export default ChatBubble;
 