import { generateRoomId } from "../../utils/generateRoomId";
import { PLAYER_COLORS } from "../../utils/playerColors";
import type { Room, Rooms } from "./room.types";

export class RoomService {
  private rooms: Rooms = {};

  // GET ROOM BY ID
  getRoomById(roomId: string): Room {
    const room = this.rooms[roomId];

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  // CREATE ROOM
  createRoom(playerName: string, socketId: string): Room {
    const roomId = generateRoomId();

    const newRoom: Room = {
      id: roomId,

      hostId: socketId,

      status: "waiting",

      players: [
        {
          id: socketId,
          socketId,
          name: playerName,

          isAlive: true,
          isReady: false,
          isHost: true,

          color: PLAYER_COLORS[0] || "#000000",
        },
      ],

      game: {
        roomId,

        status: "waiting",
        phase: "lobby",

        round: 1,
        maxRounds: 10,

        timer: {
          startedAt: 0,
          endsAt: 0,
          duration: 0,
        },
      },
    };

    this.rooms[roomId] = newRoom;

    return newRoom;
  }

  // JOIN ROOM
  joinRoom(roomId: string, playerName: string, socketId: string): Room {
    const MAX_PLAYER = 8;

    const room = this.getRoomById(roomId);

    if (!room) {
      throw new Error("ROOM_NOT_FOUND");
    }

    if (room.players.length >= MAX_PLAYER) {
      throw new Error("ROOM_FULL");
    }

    if (room.game?.status !== "waiting") {
      throw new Error("GAME_ALREADY_STARTED");
    }

    const playerAlreadyExists = room.players.some(
      (player) => player.socketId === socketId,
    );

    if (playerAlreadyExists) {
      throw new Error("PLAYER_ALREADY_IN_ROOM");
    }

    const color = PLAYER_COLORS[room.players.length] || "#000000";

    room.players.push({
      id: socketId,
      name: playerName,
      socketId,
      color,

      isAlive: true,
      isReady: false,
      isHost: false,
    });

    return room;
  }
}
