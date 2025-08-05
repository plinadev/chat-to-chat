import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useState } from "react";
import { FaGrinBeam, FaPaperPlane } from "react-icons/fa";

interface MessageInputProps {
  sendMessage: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function MessageInput({ sendMessage, message, setMessage }: MessageInputProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center p-4 border-t border-stone-200">
      <FaGrinBeam
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="text-stone-500 mr-2 cursor-pointer"
      />

      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <input
        type="text"
        placeholder="Message..."
        className="flex-1 border-none p-2 focus-visible:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <FaPaperPlane
        className="text-stone-500 ml-2 cursor-pointer"
        onClick={sendMessage}
      />
    </div>
  );
}

export default MessageInput;
