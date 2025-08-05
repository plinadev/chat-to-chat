import { User } from "@/types";
import { useState } from "react";
import Chatroom from "./Chatroom";
import UserCard from "./UserCard";

interface UserCardProps {
  user: User;
}

function Users({ user }: UserCardProps) {
  const [activeTab, setActiveTab] = useState<string>("users");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="shadow-lg h-screen overflow-s mt-4 mb-20">
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

      <div>
        {activeTab === "chatrooms" && (
          <>
            <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
            <UserCard
              name="john"
              avatarUrl="https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=PastelBlue&clotheType=ShirtVNeck&eyeType=Close&eyebrowType=FlatNatural&facialHairColor=Blonde&facialHairType=MoustacheMagnum&hairColor=BlondeGolden&hatColor=White&mouthType=Serious&skinColor=DarkBrown&topType=LongHairBigHair"
              latestMessageText="Hey, how are you?"
              time="2h ago"
              type={"chat"}
            />
          </>
        )}
      </div>

      <div>
        {activeTab === "users" && (
          <>
            <h1 className="px-4 text-base font-semibold">Users</h1>
            <UserCard
              name="john"
              avatarUrl="https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=PastelBlue&clotheType=ShirtVNeck&eyeType=Close&eyebrowType=FlatNatural&facialHairColor=Blonde&facialHairType=MoustacheMagnum&hairColor=BlondeGolden&hatColor=White&mouthType=Serious&skinColor=DarkBrown&topType=LongHairBigHair"
              time="2h ago"
              type={"user"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
