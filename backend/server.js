const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const rentalRouter = require("./routes/rentalRoutes");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
const DB = process.env.CONNECTION;
const PORT = process.env.PORT;
app.use("/user", userRouter);
app.use("/rental", rentalRouter);
mongoose.connect(DB).then(() => {
  console.log("DB connected");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
