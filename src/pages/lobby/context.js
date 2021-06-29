import React, { useMemo, useState } from "react";
import { enterLobbyByCode } from "../../api/lobby";
import { getUserLogged } from "../../services/auth";

export const LobbyContext = React.createContext();

export const LobbyProvider = ({ lobbyData, children }) => {
  return (
    <LobbyContext.Provider value={{ lobbyData }}>
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobby = () => React.useContext(LobbyContext);
