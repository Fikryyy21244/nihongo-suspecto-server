import { generateRoomId } from "../../utils/generateRoomId";
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
    const playerId = crypto.randomUUID();

    const newRoom: Room = {
      id: roomId,

      hostId: playerId,

      status: "waiting",

      players: [
        {
          id: playerId,
          socketId,
          name: playerName,

          isAlive: true,
          isReady: false,
          isHost: true,

          color: "#FF0000",
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
}
