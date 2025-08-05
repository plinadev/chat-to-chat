import { Message } from "@/types";
import Image from "next/image";

interface MessageCardProps {
  message: Message;
  user: string;
}

function MessageCard({ message, user }: MessageCardProps) {
  const isMessageFromMe = message.sender === user;

  return (
    <div
      key={message.id}
      className={`flex items-end mb-4 ${
        isMessageFromMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMessageFromMe && (
        <div className="w-8 h-8 relative rounded-full overflow-hidden mr-2 flex-shrink-0">
          <Image
            src={message.avatarUrl}
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
          {message.time}
        </div>
      </div>

      {isMessageFromMe && (
        <div className="w-8 h-8 relative rounded-full overflow-hidden ml-2 flex-shrink-0">
          <Image
            src={message.avatarUrl}
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
