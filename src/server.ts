import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { initSocket } from "./socket";

const app = express();

dotenv.config();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initSocket(io);

const PORT = process.env.PORT || 5555;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
