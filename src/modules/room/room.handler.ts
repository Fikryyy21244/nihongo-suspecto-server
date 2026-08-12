import type { Server, Socket } from "socket.io";
import { RoomService } from "./room.service";

const roomService = new RoomService();

export const roomHandler = (io: Server, socket: Socket) => {
  socket.on("room:create", ({ playerName }: { playerName: string }) => {
    try {
      if (!playerName || !playerName.trim()) {
        socket.emit("room:error", {
          message: "Nama player tidak boleh kosong!",
        });

        return;
      }
      const room = roomService.createRoom(playerName, socket.id);

      socket.join(room.id);

      console.log("ROOM CREATED:", room.id);

      socket.emit("room:created", {
        message: "Room berhasil dibuat!",
        room,
      });
    } catch (error) {
      socket.emit("room:error", {
        message:
          error instanceof Error ? error.message : "Failed to create room",
      });
    }
  });

  // GET ROOM
  socket.on("room:get", ({ roomId }: { roomId: string }) => {
    try {
      const room = roomService.getRoomById(roomId);

      socket.join(room.id);

      console.log("ROOM FETCHED:", room.id);

      socket.emit("room:data", {
        room,
      });
    } catch (error) {
      socket.emit("room:error", {
        message: error instanceof Error ? error.message : "Room not found",
      });
    }
  });
};
