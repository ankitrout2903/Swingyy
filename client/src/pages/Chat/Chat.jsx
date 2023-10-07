import Friends from "../../components/Friends/Friends";
import FriendsPopup from "../../components/Friends/addFriends";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host, getFriendsRoute } from "../../utils/APIRoutes";
import Home from "../../components/Home/Home";
import Messages from "../../components/Messages/Messages";
import { io } from "socket.io-client";
import "./style.css";
import NavBar from "../../components/NavBar/NavBar";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState(undefined);
  const [curChat, setCurChat] = useState(undefined);
  const [friends, setFriends] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // the API is using this id to get friends.
  const uid = JSON.parse(localStorage.getItem("_id"));

  async function fetchUser() {
    if (!localStorage.getItem("react-chat-user")) {
      navigate("/login");
    } else {
      setCurUser(await JSON.parse(localStorage.getItem("react-chat-user")));
      setIsLoaded(true);
    }
  }

  async function fetchData() {
    if (curUser) {
      const res = await axios.get(`${getFriendsRoute}/${uid}`);
      if (res.data.status === false) {
        localStorage.clear();
        navigate("/login");
      }
      setFriends(res.data.friends);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (curUser) {
      socket.current = io(host);
      socket.current.emit("add-user", curUser.email);
    }
  }, [curUser]);

  useEffect(() => {
    fetchData();
  }, [curUser]);

  function handleChatChange(chat) {
    setCurChat(chat);
  }

  return (
    <div className="chat-container">
      {curUser && (
        <div>
          <NavBar curUser={curUser?.displayName} />
        </div>
      )}

      <div className="chat-main">
        <FriendsPopup userId={uid} />
        <Friends friends={friends} changeChat={handleChatChange} />
        {isLoaded && curChat === undefined ? (
          <Home />
        ) : (
          <Messages curChat={curChat} curUser={curUser} socket={socket} />
        )}
      </div>
    </div>
  );
}
