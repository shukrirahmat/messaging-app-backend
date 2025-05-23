const express = require("express");
const app = express();
const cors = require("cors");

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.get("/", (req, res) => {
    res.send("HELLO");
})

//ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({message: err.message})
});

//CONNECTING
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
