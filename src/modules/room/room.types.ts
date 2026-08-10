import type { Player } from "../player/player.types";
import type { Game } from "../game/game.types";

export type RoomStatus = "waiting" | "playing" | "finished";

export type Room = {
  id: string;

  hostId: string;

  players: Player[];

  status: RoomStatus;

  game?: Game;
};

export type Rooms = Record<string, Room>;
