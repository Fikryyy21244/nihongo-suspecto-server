import { rooms } from "../stores/room.store";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateRoomId = (): string => {
  while (true) {
    let roomId = "";

    for (let i = 0; i < 8; i++) {
      roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (!rooms[roomId]) {
      return roomId;
    }
  }
};
