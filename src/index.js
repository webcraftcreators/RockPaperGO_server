import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import registerRouter from "./routes/register.js";

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rockpapergo')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', registerRouter);

// Basic test route
app.get("/", (req, res) => {
  res.json({ message: "Serveris veikia! Testas" });
});

// WebSocket server setup
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

// Start server
app.listen(PORT, () => {
  console.log(`Serveris veikia http://localhost:${PORT}`);
});
