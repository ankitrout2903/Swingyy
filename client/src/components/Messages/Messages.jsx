import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { getMsgsRoute,sendMsgRoute } from '../../utils/APIRoutes';
import {FaPaperPlane} from 'react-icons/fa';
import './style.css';
import {useNavigate} from 'react-router-dom';

export default function Messages({curUser, curChat, socket}){
    const [msg, setMsg] = useState("");
    const [msgs,setMsgs] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const navigate = useNavigate();
    const scrollRef = useRef();

    async function fetchData(){
        if (curChat){
            const res = await axios.post(getMsgsRoute, {
                from: curUser._id,
                to: curChat._id,
            });
            console.log(res.data);
            if (res.data.status === false){
                localStorage.clear();
                navigate('/login');
            }
            setMsgs(res.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [curChat]);

    async function handleSend(e){
        e.preventDefault();
        console.log(curChat);
        if (msg.length > 0){
            const res = await axios.post(sendMsgRoute, {
                from: curUser._id,
                to: curChat.id,
                message:msg,
                createdAt: Date.now(),
            });
            if (res.data.status === false){
                localStorage.clear();
                navigate('/login');
            }
            socket.current.emit("send-msg", {
                to:curChat._id,
                from:curUser._id,
                type:"text",
                message:msg,
            });
            const messages = [...msgs];
            messages.push({fromSelf:true,message:msg});
            setMsgs(messages);
            setMsg("");
        }
        
    }

    useEffect(() => {
        if (socket.current){
            socket.current.on("msg-recieved", (msg) => {
                if(msg.type === "text")
                setArrivalMsg({fromSelf:false, message:msg});
                
            })
        }
    }, []);


    useEffect(() => {
        arrivalMsg && setMsgs((oldMsgs) => [...oldMsgs, arrivalMsg]);

    }, [arrivalMsg]);
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [msgs]);

    return (
        <div className='messages-container'>
            {
            curChat && (
            <div className='message-area'>
            <div className='messages scroll-style'>
                {
                    msgs.map((message) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}> 
                                <div className={`message ${message.fromSelf ? "sent" : "recieved"}`}>
                                    <p className='message-text'>{message.message}</p>
                                    {
                                        message.time &&
                                        <div className='message-date'> 
                                            <p>{message.time.substring(5,7)} 
                                            -{message.time.substring(8,10)}
                                            -{message.time.substring(0,4)}
                                            : {message.time.substring(11,16)}
                                            </p>
                                        </div>
                                    }
                                </div>

                            </div>
                        );
                    })
                }
            </div>
            <form className='message-form' onSubmit={handleSend}>
                <input 
                className="message-input"
                type="text"
                placeholder="Enter Message"
                name="message"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
                <button className='message-btn'><FaPaperPlane/></button>
            </form>
            </div>
            )
        }
        </div>
    )
}