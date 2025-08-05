import { Message, User } from "@/types";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";

interface UserCardProps {
  user: User;
}

function Chatroom({ user }: UserCardProps) {
  const messages: Message[] = [
    {
      id: 1,
      sender: "katty perry",
      avatarUrl:
        "https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=PastelBlue&clotheType=ShirtVNeck&eyeType=Close&eyebrowType=FlatNatural&facialHairColor=Blonde&facialHairType=MoustacheMagnum&hairColor=BlondeGolden&hatColor=White&mouthType=Serious&skinColor=DarkBrown&topType=LongHairBigHair",

      content: "hey how are you?",
      time: "2h ago",
    },
    {
      id: 2,
      sender: "joni mitchell",
      avatarUrl:
        "https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=PastelBlue&clotheType=ShirtVNeck&eyeType=Close&eyebrowType=FlatNatural&facialHairColor=Blonde&facialHairType=MoustacheMagnum&hairColor=BlondeGolden&hatColor=White&mouthType=Serious&skinColor=DarkBrown&topType=LongHairBigHair",

      content: "hey how are you?",
      time: "2h ago",
    },
  ];
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-10">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            user={"joni mitchell"}
          />
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default Chatroom;
