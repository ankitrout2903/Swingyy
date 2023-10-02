# Swingyy: Real-Time Chat Application

Swingyy is a robust chat application that enables real-time messaging between users. It comes with a range of features including user authentication, friends list management, and message status tracking.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **User Authentication**: Sign up, log in, and log out functionalities.
- **Friends List**: View and manage your list of friends.
- **Real-Time Messaging**: Send and receive messages instantly.
- **Message Status**: Mark messages as seen or unseen.
- **User Status**: Monitor the online/offline status of friends.
- **Profile Management**: Upload and display your profile picture.

## Technologies

### Frontend

- React
- React Router
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MySQL
- Socket.IO
- Docker

### Styling

- CSS

### Cloud Services (Google Cloud Platform)

- Cloud Build: CI/CD pipeline
- Cloud Run: Serverless deployment
- Cloud SQL: MySQL database
- Firebase: Google Authentication
- Artifact Registry: Docker container registry
- Cloud Storage: File storage
- Docker

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/Swingyy.git
   ```

2. **Navigate to Project Directory**

   ```bash
   cd chat-app
   ```

3. **Install Dependencies**

   - Frontend:
     ```bash
     cd client
     npm start
     ```
   - Backend:
     ```bash
     cd server
     npm start
     ```

4. **Configuration**

   - Update MySQL connection details in `backend/config/db.js`.
   - Update Socket.IO server URL in `frontend/src/utils/socket.js`.

5. **Start Development Servers**

   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```

   Open `http://localhost:3000` in your browser.

## Usage

1. Sign up or log in.
2. You'll be redirected to the chat interface.
3. Your friends list appears on the left; click a friend to start chatting.
4. Messages are real-time and auto-scroll to the latest.
5. Click messages to mark as seen or unseen.
6. Log out via the "Logout" button in the top-right corner.

## Screenshots

![Chat Interface](https://github.com/ankitrout2903/Swingyy2/assets/88599131/164577c8-77f5-4d13-88cb-078da8907e5b.png)
![Additional Screenshot](https://github.com/ankitrout2903/Swingyy/assets/88599131/1031d934-5db1-416e-bec3-d62c6d8ce476.png)

## License

This project is licensed under the MIT License.
