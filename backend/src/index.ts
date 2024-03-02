import express, { Request, Response } from "express";
import cors from "cors";
import * as WebSocket from "ws";
import * as http from "http";

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const webSocketsServer = new WebSocket.Server({ server });

app.use(cors({}));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, world!" });
});

webSocketsServer.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
