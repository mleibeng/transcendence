import React from "react";
import { Header } from "./LobbyHeader";
import { Participants } from "./LobbyParticipants";
import { AdminControls } from "./LobbyControls";
import { TournamentBracket } from "./LobbyTourBrackets";

interface LobbySetupProps {
  lobbyType: "game" | "tournament";
  isAdmin: boolean;
  chatPosition?: "right" | "left" | "overlay";
}

const LobbySetup: React.FC<LobbySetupProps> = ({
  lobbyType,
  isAdmin,
}) => {
  return (
    <div className="bg-gray-900 p-4 flex flex-col md:flex-row gap-4">
      <div className={`flex-1 flex flex-col gap-4`}>
        <Header lobbyType={lobbyType} isAdmin={isAdmin} chatPosition={"right"} />
        <Participants />
        <AdminControls isAdmin={isAdmin} lobbyType={lobbyType} />
        {lobbyType === "tournament" && <TournamentBracket />}
      </div>
    </div>
  );
};

export default LobbySetup