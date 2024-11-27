import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import createError from "http-errors";
import { Server } from "socket.io";
import http from "http";

import { connectDb } from "./config/db.config.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import chatRouter from "./routers/chatRouter.js";
import messageRouter from "./routers/messageRouter.js";

dotenv.config();

const app = express();

//setup socket io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("new client connected");
  

  socket.on("disconnect", () => {
    console.log("socket disconnected!");
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    maxAge: 600,
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use("/upload", express.static(path.join(path.resolve() + "/upload")));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.use((req, res, next) => {
  console.log("path ",req.path)
  next(createError(404, "page not found!"));
});

app.use((error, req, res, next) => {
  console.log(error);
  const message = error.message || "server side error!";
  const status = error.status || 500;
  return res.status(status).json({ error: message });
});

app.listen(process.env.PORT, async (error) => {
  try {
    console.log("Server is running successfully at ", process.env.PORT);
    await connectDb();
  } catch (error) {
    console.log(`Dev Error : ${error}`);
  }
});
