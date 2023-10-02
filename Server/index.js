// Import necessary dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");
const connection = require("./db");
const app = express();

// Set up CORS to allow requests from the client
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Load environment variables from the .env file
require("dotenv").config();

// Import route files
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const friendsRoutes = require("./routes/friendsRoutes");

// Create an instance of the Express application

const server = http.createServer(app);
// const io = socketIO(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Set up middleware and configuration
app.use(express.json());
app.use(cookieParser());

// Define routes

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendsRoutes);
app.get("/api/test", (req, res) => {
connection.query('SELECT * FROM user_table', function (error, results, fields) {
  if (error) throw error;

  console.log('The solution is: ', results);
  res.json(results);
});
});


// Set up Socket.IO server and define event handlers for real-time chat
io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    socket.join(userId); // Join a room with the user's ID for private messaging
  });

  socket.on("send-msg", (data) => {
    io.to(data.to).emit("msg-received", data.message); // Emit the message to the specified user's room
  });
});

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server connected on port: ${port}`);
});
