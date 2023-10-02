import Friends from '../../components/Friends/Friends';
import FriendsPopup from '../../components/Friends/addFriends';
import { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { host, getFriendsRoute } from '../../utils/APIRoutes';
import Home from '../../components/Home/Home'
import Messages from '../../components/Messages/Messages'
import {io} from "socket.io-client";
import './style.css';


/**
 * while I have completed the friends functionality, there's still one more issue,
 * the friend list loads when you reload the page once, this can probably be fixed by creating a home page and then preloading the data. 
 */
export default function Chat(){ 
    const socket = useRef();
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState(undefined);
    const [curChat, setCurChat] = useState(undefined);
    const [friends, setFriends] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // the API is using this id to get friends.
    const uid = JSON.parse(localStorage.getItem('_id'));
    
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
           
            const res = await axios.get(`${getFriendsRoute}/${uid}`);
            if (res.data.status === false){
                localStorage.clear();
                navigate('/login');
            }
            setFriends(res.data.friends);
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
            <FriendsPopup userId={uid} />
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