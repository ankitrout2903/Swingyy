# Chat App

This is a simple chat application that allows users to send and receive messages in real-time.

## Features

- User authentication: Users can sign up, log in, and log out.
- Friends list: Users can view their list of friends.
- Real-time messaging: Users can send and receive messages in real-time.
- Seen and unseen messages: Messages can be marked as seen or unseen.
- User status: Users can see the online/offline status of their friends.
- Profile picture: Users can upload and display their profile picture.

## Technologies Used

- Frontend: React, React Router, Axios, Socket.IO Client
- Backend: Node.js, Express.js, MySQL, Socket.IO
- Styling: CSS

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/chat-app.git
Navigate to the project directory:

shell
Copy code
cd chat-app
Install the dependencies for both the frontend and backend:

shell
Copy code
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
Configuration:

Create a MySQL database and update the connection details in the backend/config/db.js file.
Update the Socket.IO server URL in the frontend/src/utils/socket.js file.
Start the development server:

Configure dotenv file according to your credentials

shell
Copy code
# Start the backend server (runs on http://localhost:5000)
cd backend
npm start

# Start the frontend development server (runs on http://localhost:3000)
cd ../frontend
npm start
Open your browser and visit http://localhost:3000 to access the chat app.

Usage
Sign up with a new account or log in with an existing account.
After logging in, you will be redirected to the chat interface.
On the left side, you will see your list of friends. Click on a friend to start a conversation.
In the conversation view, you can send and receive messages in real-time.
New messages will appear instantly, and the chat will be scrolled to the latest message.
You can mark messages as seen or unseen by clicking on them.
You can log out by clicking the "Logout" button in the top right corner.



License
This project is licensed under the MIT License.

vbnet
Copy code

Feel free to customize and enhance the README file based on your specific chat app's features and requirements.



