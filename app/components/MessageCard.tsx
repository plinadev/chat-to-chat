import { Message, User } from "@/types";
import timeSent from "@/utils/timeSent";
import Image from "next/image";
interface MessageCardProps {
  message: Message;
  me: User;
  otherUser: User;
}

function MessageCard({ message, me, otherUser }: MessageCardProps) {
  const isMessageFromMe = message.senderId === me.uid;
  return (
    <div
      key={message.uid}
      className={`flex items-end mb-4 ${
        isMessageFromMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMessageFromMe && (
        <div className="w-8 h-8 relative rounded-full overflow-hidden mr-2 flex-shrink-0">
          <Image
            src={otherUser.avatarUrl}
            alt="avatar"
            className="object-cover"
            fill
            unoptimized
          />
        </div>
      )}

      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl relative shadow ${
          isMessageFromMe
            ? "bg-[var(--color-primary)] text-[var(--color-base-content)] rounded-br-none"
            : "bg-[var(--color-neutral-content)] text-[var(--color-neutral)] rounded-bl-none"
        }`}
      >
        <p className="break-words">{message.content}</p>
        <div
          className={`text-xs mt-1 ${
            isMessageFromMe
              ? "text-[var(--color-primary-content)]"
              : "text-stone-500"
          } text-right`}
        >
          {message.time && timeSent(message.time)}
        </div>
      </div>

      {isMessageFromMe && (
        <div className="w-8 h-8 relative rounded-full overflow-hidden ml-2 flex-shrink-0">
          <Image
            src={me.avatarUrl}
            alt="avatar"
            className="object-cover"
            fill
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

export default MessageCard;
