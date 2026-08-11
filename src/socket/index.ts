import { Server } from "socket.io";
import { roomHandler } from "../modules/room/room.handler";

export const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("player connected", socket.id);

    roomHandler(io, socket);
  });
};
