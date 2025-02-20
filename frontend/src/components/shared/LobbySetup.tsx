/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user_interface.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:41 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:11:41 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

interface LobbySetupProps {
  lobbyType: "game" | "tournament";
  currentUserId: string;
  isAdmin: boolean;
  chatPosition?: "right" | "left" | "overlay";
}

const LobbySetup: React.FC<LobbySetupProps> = ({
  lobbyType,
  isAdmin,
  chatPosition = "right",
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-gray-900 text-white p-4 rounded-lg">
      {/* Main Lobby Area */}
      <div className={`flex-1 ${chatPosition !== "overlay" ? "md:w-2/3" : "w-full"} flex flex-col`}>
        {/* Header Section */}
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

        {/* Participants Section */}
        <div className="flex-1 overflow-y-auto bg-gray-800 p-4 mt-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Participants (0)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            participants go here
          </div>
        </div>

        {/* Admin Controls */}
        <div className="bg-gray-800 p-4 mt-4 rounded-lg flex flex-wrap gap-4 justify-between items-center">
          {isAdmin && (
            <form className="flex flex-1 min-w-0">
              <input
                type="text"
                placeholder="Invite player by username..."
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-r-md cursor-not-allowed"
                disabled
              >
                Invite
              </button>
            </form>
          )}

          {/* Start Button */}
          <button
            disabled
            className={`px-6 py-2 rounded-md font-medium ${
              isAdmin
                ? "bg-green-600"
                : "bg-gray-600"
            } cursor-not-allowed`}
          >
            {lobbyType === "game" ? "Start Game" : "Start Tournament"}
          </button>
        </div>

        {/* Tournament Bracket Visualization - Only for tournament lobby */}
        {lobbyType === "tournament" && (
          <div className="bg-gray-800 p-4 mt-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Tournament Bracket</h2>
            <div className="overflow-x-auto">
              <div
                className="h-64 min-w-full flex items-center justify-center bg-gray-700 rounded-lg p-4"
                style={{
                  backgroundImage: "linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              >
                <div className="text-center">
                  <p>Waiting for more participants...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Section */}
      {(chatPosition !== "overlay" || (chatPosition === "overlay" && true)) && (
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
            {/* Chat messages would be rendered here */}
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
      )}
    </div>
  );
};

export default LobbySetup;