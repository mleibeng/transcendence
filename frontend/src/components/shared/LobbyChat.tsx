import React from "react";

interface ChatProps {
  chatPosition: string;
}

export const Chat: React.FC<ChatProps> = ({ chatPosition }) => {
  return (
    <div
      className={`bg-gray-800 mt-4 md:mt-0 rounded-lg p-4 flex flex-col ${
        chatPosition === "overlay"
          ? "absolute right-8 bottom-8 w-80 h-96 shadow-lg"
          : chatPosition === "right"
          ? "md:ml-4 md:w-1/3"
          : "md:mr-4 md:w-1/3 md:order-first"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Lobby Chat</h2>
      <div className="flex-1 bg-gray-700 rounded-lg p-4 mb-4 overflow-y-auto">
        <p className="text-gray-400 text-center">Chat messages will appear here</p>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded-r-md cursor-not-allowed"
          disabled
        >
          Send
        </button>
      </div>
    </div>
  );
};