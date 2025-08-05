import { User } from "@/types";
import Image from "next/image";

interface UserCardProps {
  name: string;
  avatarUrl: string;
  latestMessageText?: string | null;
  time: string;
  type: string;
}

function UserCard({
  name,
  avatarUrl,
  latestMessageText,
  time,
  type,
}: UserCardProps) {
  return (
    <div className="flex items-center p-4 border-b border-[var(--color-primary)] relative hover:cursor-pointer">
      <div className="flex w-full gap-2 mr-4 relative">
        <div className="w-12 h-12 rounded-full overflow-hidden relative">
          <Image
            src={avatarUrl}
            alt="avatar"
            className="object-cover"
            fill
            unoptimized
          />
        </div>
        {type === "chat" && (
          <>
            <div className="flex-1">
              <div className="flex items-center justify-between ">
                <h2 className="text-lg font-semibold">{name}</h2>
                <span className="text-xs text-[var(--color-secondary-neutral)]">
                  {time}
                </span>
              </div>
              <p className="text-sm text-[var(--color-secondary-neutral)] truncate">
                {latestMessageText}
              </p>
            </div>
          </>
        )}
        {type === "user" && (
          <>
            <div className="flex">
              <div className="flex items-center justify-between ">
                <h2 className="text-lg font-semibold">{name}</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserCard;
