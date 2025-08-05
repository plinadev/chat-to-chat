"use client";

import { firestore } from "@/firebase.config";
import { SelectedChatroom, User } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Users from "./components/Users";
import Chatroom from "./components/Chatroom";

export default function Home() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  const [selectedChatroom, setSelectedChatroom] =
    useState<SelectedChatroom | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        if (userData) {
          setUser({
            uid: user.uid,
            name: userData.name,
            email: userData.email,
            avatarUrl: userData.avatarUrl,
          });
        }
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-shrink-0 w-4/12 ">
        {user && (
          <Users userData={user} setSelectedChatroom={setSelectedChatroom} />
        )}
      </div>
      <div className="flex-grow w-3/12">
        {user && selectedChatroom && (
          <Chatroom user={user} selectedChatroom={selectedChatroom} />
        )}
      </div>
    </div>
  );
}
