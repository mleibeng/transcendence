import React from "react";

export const Participants: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 p-4 mt-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Participants (0)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        participants go here
      </div>
    </div>
  );
};