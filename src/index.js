import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";
import registerRouter from "./routes/register.js";
import connectToDatabase from "./services/database.js";

dotenv.config();

connectToDatabase();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Paprastas API endpointas
app.get("/", (req, res) => {
  res.json({ message: "Serveris veikia! Testas" });
});

app.use("/", registerRouter);

// // WebSocket serveris
// const wss = new WebSocketServer({ port: 5001 });

// wss.on("connection", (ws) => {
//   console.log("Naujas WebSocket klientas");
//   ws.send("Sveiki prisijungę!");

//   ws.on("message", (message) => {
//     console.log("Gauta žinutė:", message.toString());
//     ws.send(`Gavau: ${message}`);
//   });

//   ws.on("close", () => console.log("Klientas atsijungė"));
// });

const port = process.env.PORT || 5002;

// Paleidžiame Express serverį
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Serveris veikia ant ${port} porto`);
  });
});
