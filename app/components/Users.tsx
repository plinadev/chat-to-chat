/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chatroom, SelectedChatroom, User } from "@/types";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebase.config";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import timeAgo from "@/utils/timeAgo";

interface UserCardProps {
  userData: User;
  setSelectedChatroom: (chatroom: SelectedChatroom) => void;
}

function Users({ userData, setSelectedChatroom }: UserCardProps) {
  const [activeTab, setActiveTab] = useState<string>("users");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingChatrooms, setLoadingChatrooms] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [userChatrooms, setUserChatrooms] = useState<Chatroom[]>([]);
  const auth = getAuth();
  const router = useRouter();

  const handleTabClick = (tab: "users" | "chatrooms") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const usersQuery = query(collection(firestore, "users"));

    const unsubscribe = onSnapshot(
      usersQuery,
      (querySnapshot) => {
        const fetchedUsers: User[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            return {
              uid: doc.id,
              name: data.name,
              email: data.email,
              avatarUrl: data.avatarUrl,
            };
          }
        );
        setUsers(fetchedUsers);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const createChat = async (user: User) => {
    const existingChatroomsQuery = query(
      collection(firestore, "chatrooms"),
      where("users", "==", [userData.uid, user.uid]) // ⚠️ optional improvement discussed below
    );

    try {
      const existingChatroomsSnapshot = await getDocs(existingChatroomsQuery);

      if (existingChatroomsSnapshot.docs.length > 0) {
        toast.error("Chatroom already exists for these users.");
        return;
      }

      const usersData: Record<string, User> = {
        [userData.uid]: userData,
        [user.uid]: user,
      };

      const chatroomData = {
        users: [userData.uid, user.uid],
        usersData,
        timestamp: serverTimestamp(),
        lastMessage: null,
      };

      const chatroomRef = await addDoc(
        collection(firestore, "chatrooms"),
        chatroomData
      );

      console.log("Chatroom created with ID:", chatroomRef.id);
      setActiveTab("chatrooms");
    } catch (error) {
      console.error("Error creating or checking chatroom:", error);
      toast.error("Something went wrong while creating the chat.");
    }
  };
  const openChat = (chatroom: Chatroom) => {
    const data: SelectedChatroom = {
      uid: chatroom.uid,
      myData: userData,
      otherUserData: chatroom.usersData.find((u) => u.uid !== userData?.uid),
    };
    setSelectedChatroom(data);
    console.log(data);
  };

  useEffect(() => {
    if (!userData) return;

    const chatroomsQuery = query(
      collection(firestore, "chatrooms"),
      where("users", "array-contains", userData.uid)
    );

    const unsubscribe = onSnapshot(chatroomsQuery, (querySnapshot) => {
      const chatrooms: Chatroom[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          uid: doc.id,
          timestamp: data.timestamp,
          users: data.users,
          lastMessage: data.lastMessage,
          usersData: Object.values(data.usersData),
        };
      });

      setUserChatrooms(chatrooms);
      setLoadingChatrooms(false);
    });

    return unsubscribe;
  }, [userData]);
  return (
    <div className="flex flex-col h-screen shadow-lg mt-4 mb-20">
      <div className="flex justify-between p-4">
        <button
          className={`btn rounded ${
            activeTab === "users" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTabClick("users")}
        >
          Users
        </button>
        <button
          className={`btn rounded ${
            activeTab === "chatrooms" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTabClick("chatrooms")}
        >
          Chatrooms
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        {activeTab === "chatrooms" && (
          <>
            <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
            {loadingChatrooms ? (
              <span className="loading loading-spinner loading-lg flex justify-self-center pt-5 "></span>
            ) : (
              userChatrooms.map((chatroom) => {
                const otherUser = chatroom.usersData.find(
                  (u) => u.uid !== userData?.uid
                );

                if (!otherUser) return null;

                return (
                  <div key={chatroom.uid} onClick={() => openChat(chatroom)}>
                    <UserCard
                      name={otherUser.name}
                      avatarUrl={otherUser.avatarUrl}
                      latestMessageText={chatroom.lastMessage?.content}
                      time={
                        chatroom.lastMessage?.time
                          ? timeAgo(chatroom.lastMessage.time)
                          : ""
                      }
                      type="chat"
                    />
                  </div>
                );
              })
            )}
          </>
        )}

        {activeTab === "users" && (
          <>
            <h1 className="px-4 text-base font-semibold">Users</h1>
            {loading ? (
              <span className="loading loading-spinner loading-lg flex justify-self-center pt-5 "></span>
            ) : (
              users.map((user) => {
                if (user.uid !== userData.uid) {
                  return (
                    <div key={user.uid} onClick={() => createChat(user)}>
                      <UserCard
                        name={user.name}
                        avatarUrl={user.avatarUrl}
                        time="2h ago"
                        type={"user"}
                      />
                    </div>
                  );
                }
              })
            )}
          </>
        )}
      </div>

      <div className="p-10 mt-auto">
        <button className="btn btn-outline rounded " onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default Users;
