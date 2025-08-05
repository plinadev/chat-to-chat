import { FieldValue, Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  name: string;
  email: string;
  avatarUrl: string;
};

export type Message = {
  uid: string;
  chatroomId: string;
  senderId: string;
  content: string;
  image: string;
  messageType: "text" | "image";
  time: Timestamp;
  receiverId: string;
};

export type Chatroom = {
  uid: string;
  timestamp: Timestamp;
  users: string[];
  lastMessage: Message | null;
  usersData: User[];
};

export type SelectedChatroom = {
  uid: string;
  myData: User;
  otherUserData: User | undefined;
};
