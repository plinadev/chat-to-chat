import React, { useState } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { getStorage } from "firebase/storage";
interface MessageInputProps {
  sendMessage: () => void;
  message: string;
  setMessage: (message: string) => void;
}
function MessageInput({ sendMessage, message, setMessage }: MessageInputProps) {
  const storage = getStorage();
  const [file, setFile] = useState(null);

  return (
    <div className="flex items-center p-4 m-b-2 border-t border-stone-200">
      <FaPaperclip className="text-stone-500 mr-2 cursor-pointer" />
      <input
        type="text"
        placeholder="Message..."
        className="flex-1 border-none p-2 focus-visible:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <FaPaperPlane
        className="text-stone-500 mr-2 cursor-pointer"
        onClick={() => sendMessage()}
      />
    </div>
  );
}

export default MessageInput;
