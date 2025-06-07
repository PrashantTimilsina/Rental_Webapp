const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const rentalRouter = require("./routes/rentalRoutes");
const wishRouter = require("./routes/wishRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const hpp = require("hpp");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://rental-frontend-ndxp.onrender.com",
    credentials: true,
  },
});
app.use(
  cors({
    origin: "https://rental-frontend-ndxp.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
//prevent from no sql injection
// Middleware to sanitize only body and params (avoid sanitizing req.query)
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  // Do NOT sanitize req.query here to avoid error
  next();
});

//reject duplicate query parameter
app.use(hpp());
app.use(helmet());
const limiter = rateLimit({
  max: 500, // limit each IP to 150 requests
  windowMs: 60 * 60 * 1000, // per hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use(limiter);
const DB = process.env.CONNECTION;
const PORT = process.env.PORT;
app.use("/user", userRouter);
app.use("/rental", rentalRouter);
app.use("/wishlist", wishRouter);
app.use("/payment", paymentRouter);
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
