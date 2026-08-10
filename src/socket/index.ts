import { Server } from "socket.io";

export const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("player connected", socket.id);
  });
};
