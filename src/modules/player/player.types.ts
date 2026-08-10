export type PlayerRole = "civilian" | "impostor";

export type Player = {
  id: string;
  socketId: string;
  name: string;

  isHost: boolean;
  isReady: boolean;
  isAlive: boolean;

  color?: string;

  role: PlayerRole;
};
