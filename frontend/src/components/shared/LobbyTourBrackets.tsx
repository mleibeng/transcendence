import React from "react";

export const TournamentBracket: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Tournament Bracket</h2>
      <div className="overflow-x-auto">
        <div
          className="h-64 min-w-full flex items-center justify-center bg-gray-700 rounded-lg p-4"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="text-center">
            <p>Waiting for more participants...</p>
          </div>
        </div>
      </div>
    </div>
  );
};