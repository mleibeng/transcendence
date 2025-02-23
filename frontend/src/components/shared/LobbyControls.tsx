import React from "react";

interface AdminControlsProps {
  isAdmin: boolean;
  lobbyType: "game" | "tournament";
}

export const AdminControls: React.FC<AdminControlsProps> = ({ isAdmin, lobbyType }) => {
  return (
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
          isAdmin ? "bg-green-600" : "bg-gray-600"
        } cursor-not-allowed`}
      >
        {lobbyType === "game" ? "Start Game" : "Start Tournament"}
      </button>
    </div>
  );
};