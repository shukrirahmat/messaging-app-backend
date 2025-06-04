const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/user", userRouter);
app.use("/message", messageRouter)

//ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({message: err.message})
});

//CONNECTING
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
