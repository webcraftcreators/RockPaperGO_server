import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";
import registerRouter from "./routes/register.js";

dotenv.config();

const connectToDatabase = async () => {
  const username = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER;
  const dbName = process.env.MONGODB_DB;
  const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: "majority",
    });
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    throw err;
  }
};

const initializeApp = async () => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error("Failed to initialize database connection:", err.message);
  }
};

initializeApp();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", registerRouter);

// Basic test route
app.get("/", (req, res) => {
  res.json({ message: "Serveris veikia! Testas" });
});

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

// Start server

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Serveris veikia http://localhost:${port}`);
});
