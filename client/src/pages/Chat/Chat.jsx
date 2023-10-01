import Friends from '../../components/Friends/Friends';
import { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute, host } from '../../utils/APIRoutes';
import Home from '../../components/Home/Home'
import Messages from '../../components/Messages/Messages'
import {io} from "socket.io-client";
import './style.css';

export default function Chat(){ 
    const socket = useRef();
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState(undefined);
    const [curChat, setCurChat] = useState(undefined);
    const [friends, setFriends] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    

    async function fetchUser(){
        if (!localStorage.getItem('react-chat-user')){
            navigate("/login");
        }else{
            setCurUser(await JSON.parse(localStorage.getItem('react-chat-user')));
            setIsLoaded(true);
        }
    };

    async function fetchData(){
        if (curUser){
           
            const res = await axios.get(`${allUsersRoute}/${curUser.email}`);
            if (res.data.status === false){
                localStorage.clear();
                navigate('/login');
            }
            console.log(res)
            setFriends(res.data);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (curUser){
            socket.current = io(host);
            socket.current.emit("add-user", curUser.email);
        }
    }, [curUser]);

    useEffect(() => {
        fetchData();
    }, [curUser]);

    function logout(){
        localStorage.clear();
        navigate("/login");
    }

    function handleChatChange(chat){
        setCurChat(chat);
    }

    

    return (
        <div className='chat-container'>
            {
                curUser && 
                <div className='chat-navbar'>
                    <div className="chat-header">Logged in as: {curUser?.displayName}</div>
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            }
            
            
            <div className='chat-main'>
            <Friends friends={friends} changeChat={handleChatChange} />
                {
                    isLoaded && curChat === undefined ? 
                    <Home /> : 
                    <Messages 
                    curChat={curChat}
                    curUser = {curUser}
                    socket={socket}/>
                    
                }
            </div>
            
        </div>
    );
}