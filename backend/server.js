const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const rentalRouter = require("./routes/rentalRoutes");
const wishRouter = require("./routes/wishRoutes");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
const DB = process.env.CONNECTION;
const PORT = process.env.PORT;
app.use("/user", userRouter);
app.use("/rental", rentalRouter);
app.use("/wishlist", wishRouter);
mongoose.connect(DB).then(() => {
  console.log("DB connected");
});
const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  time: String,
});
const Message = mongoose.model("message", messageSchema);
app.get("/messages/:userId", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.userId });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
io.on("connection", (socket) => {
  console.log("User connected successfully");
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("send_message", async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();
    socket.to(data.room).emit("receive_message");
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
