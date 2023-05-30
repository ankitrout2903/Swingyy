import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getMsgsRoute, sendMsgRoute } from '../../utils/APIRoutes';
import { FaPaperPlane } from 'react-icons/fa';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Messages({ curUser, curChat, socket }) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [arrivalMsgs, setArrivalMsgs] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef();

  async function fetchData() {
    if (curChat) {
      try {
        const res = await axios.post(getMsgsRoute, {
          from: curUser.email,
          to: curChat.email,
        });
        if (res.data.status === false) {
          localStorage.clear();
          navigate('/login');
        }
        setMsgs(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [curChat]);

  async function handleSend(e) {
    e.preventDefault();
    if (msg.length > 0) {
      try {
        const res = await axios.post(sendMsgRoute, {
          from: curUser.email,
          to: curChat.email,
          message: msg,
          createdAt: Date.now(),
        });
        if (res.data.status === false) {
          localStorage.clear();
          navigate('/login');
        }
        socket.current.emit("send-msg", {
          to: curChat.email,
          from: curUser.email,
          type: "text",
          message: msg,
        });
        const newMsg = { fromSelf: true, message: msg };
        setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
        setMsg("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        if (msg.type === "text") {
          setArrivalMsgs((prevArrivalMsgs) => [...prevArrivalMsgs, msg]);
        }
      });
    }
  }, [socket.current]);

  useEffect(() => {
    setMsgs((prevMsgs) => [...prevMsgs, ...arrivalMsgs]);
    setArrivalMsgs([]);
  }, [arrivalMsgs]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <div className='messages-container'>
      {curChat && (
        <div className='message-area'>
          <div className='messages scroll-style'>
            <div ref={scrollRef}>
              {msgs.map((message) => (
                <div key={message.id ?? uuidv4()}>
                  <div
                    className={`message ${message.fromSelf ? "sent" : "received"}`}
                  >
                    <p className='message-text'>{message.message}</p>
                    {message.time && (
                      <div className='message-date'>
                        <p>
                          {new Date(parseInt(message.time)).toLocaleString()}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className='message-form' onSubmit={handleSend}>
            <input
              className='message-input'
              type='text'
              placeholder='Enter Message'
              name='message'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button className='message-btn' type='submit'>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
