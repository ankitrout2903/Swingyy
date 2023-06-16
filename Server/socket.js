const socketIO = require("socket.io");
const connection = require("./db");

// Function to initialize Socket.IO server
const initSocketServer = (server) => {
  const io = socketIO(server, {
    cors: {
      // origin: "https://swingyy-c0af7.web.app",
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Set up Socket.IO server and define event handlers for real-time chat
  io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
      socket.join(userId); // Join a room with the user's ID for private messaging
    });

    socket.on("send-msg", (data) => {
      io.to(data.to).emit("msg-received", data.message); // Emit the message to the specified user's room
    });

    socket.on("send-mood", (data) => {
      io.to(data.to).emit("mood-received", data.mood); // Emit the mood to the specified user's room
    });
  });
};

module.exports = initSocketServer;