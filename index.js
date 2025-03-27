import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Paprastas API endpointas
app.get("/", (req, res) => {
  res.json({ message: "Serveris veikia! Testas, ar veikia?" });
});

// WebSocket serveris
const wss = new WebSocketServer({ port: 5001 });

wss.on("connection", (ws) => {
  console.log("Naujas WebSocket klientas");
  ws.send("Sveiki prisijungę!");

  ws.on("message", (message) => {
    console.log("Gauta žinutė:", message.toString());
    ws.send(`Gavau: ${message}`);
  });

  ws.on("close", () => console.log("Klientas atsijungė"));
});

// Paleidžiame Express serverį
app.listen(PORT, () => {
  console.log(`Serveris veikia http://localhost:${PORT}`);
});
