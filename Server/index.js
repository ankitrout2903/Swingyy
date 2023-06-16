const express = require("express");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const connection = require("./db");
const app = express();
const initSocketServer = require("./socket");

// Set up CORS to allow requests from the client
// app.use(cors({ origin: "https://swingyy-c0af7.web.app", credentials: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Load environment variables from the .env file
require("dotenv").config();

// Import route files
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const moodRoutes = require("./routes/moodRoutes");

// Create an instance of the Express application
const server = http.createServer(app);

// Set up middleware and configuration
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/mood", moodRoutes);
app.get("/api/test", (req, res) => {
  connection.query('SELECT * FROM user_table', function (error, results, fields) {
    if (error) throw error;

    console.log('The solution is: ', results);
    res.json(results);
  });
});

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server connected on port: ${port}`);
});

// Initialize Socket.IO server
initSocketServer(server);

// Export the server for testing purposes
module.exports = server;