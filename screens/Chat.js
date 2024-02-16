import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text, View,StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // Function to handle user sign out
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  
  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return unsubscribe; // Cleanup function
  }, []);

  // Function to handle sending new messages
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);


  
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email, 
        name: auth?.currentUser?.displayName, 
        avatar: "https://i.pravatar.cc/300", 
      }}
      renderMessage={({ currentMessage }) => (
        <Message message={currentMessage} user={currentMessage.user} />
      )}
    />
  );
}


const Message = ({ message, user }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.userIdText}>{user._id}</Text>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  userIdText: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'gray',
  },
});
