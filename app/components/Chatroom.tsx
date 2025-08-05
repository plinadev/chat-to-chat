/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, SelectedChatroom, User } from "@/types";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebase.config";
import toast from "react-hot-toast";

interface UserCardProps {
  user: User;
  selectedChatroom: SelectedChatroom;
}

function Chatroom({ user, selectedChatroom }: UserCardProps) {
  const me = selectedChatroom.myData;
  const otherUser = selectedChatroom.otherUserData;
  const chatroomId = selectedChatroom.uid;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatroomId) return;

    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "messages"),
        where("chatroomId", "==", chatroomId),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        const messagesData: Message[] = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...(doc.data() as Omit<Message, "uid">),
        }));

        console.log(messagesData);
        setMessages(messagesData);
      }
    );

    return unsubscribe;
  }, [chatroomId]);

  const sendMessage = async () => {
    const messageCollection = collection(firestore, "messages");

    if (message.trim() === "") return;

    try {
      const messageData = {
        chatroomId,
        senderId: me.uid,
        content: message,
        messageType: message ? "image" : "text",
        time: serverTimestamp(),
        receiverId: otherUser?.uid || "",
      };
      await addDoc(messageCollection, messageData);
      setMessage("");

      const chatroomRef = doc(firestore, "chatrooms", chatroomId);
      await updateDoc(chatroomRef, {
        lastMessage: messageData,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-10">
        {messages.map((message) => (
          <MessageCard
            key={message.uid}
            message={message}
            me={user}
            otherUser={otherUser!}
          />
        ))}
      </div>

      <MessageInput
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

export default Chatroom;
