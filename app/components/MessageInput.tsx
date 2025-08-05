import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

function MessageInput() {
  return (
    <div className="flex items-center p-4 pb-8 m-b-2 border-t border-stone-200">
      <FaPaperclip className="text-stone-500 mr-2 cursor-pointer" />
      <input
        type="text"
        placeholder="Message..."
        className="flex-1 border-none p-2 focus-visible:outline-none"
      />

      <FaPaperPlane className="text-stone-500 mr-2 cursor-pointer" />
    </div>
  );
}

export default MessageInput;
