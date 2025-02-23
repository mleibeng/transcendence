import React from "react";

interface HeaderProps {
  lobbyType: "game" | "tournament";
  isAdmin: boolean;
  chatPosition: string;
}

export const Header: React.FC<HeaderProps> = ({ lobbyType, isAdmin, chatPosition }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
      <h1 className="text-xl font-bold">
        {lobbyType === "game" ? "Game Lobby" : "Tournament Lobby"}
      </h1>

      {/* Tournament-specific controls */}
      {lobbyType === "tournament" && (
        <div className="flex items-center space-x-4">
          <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Round 1
          </span>
          {isAdmin && (
            <button
              className="px-4 py-2 rounded-md text-sm bg-gray-600 cursor-not-allowed"
              disabled
            >
              Open Registration
            </button>
          )}
        </div>
      )}

      {/* Chat visibility toggle for overlay mode */}
      {chatPosition === "overlay" && (
        <button
          className="bg-gray-700 px-3 py-1 rounded-md cursor-not-allowed"
          disabled
        >
          Hide Chat
        </button>
      )}
    </div>
  );
};