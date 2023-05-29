import { BsFillPersonFill,BsLockFill,BsArrowRight } from "react-icons/bs"
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute,registerRoute } from "../../utils/APIRoutes";
import './style.css';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth} from '../../firebase/firebaseConfig';

export default function Login() {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })

    const toastProps = {
        className: "custom-toast",
        draggable: false,
        autoClose: 7000,
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
    };
    const registerUser =async(user) => {
        const res = await axios.post(registerRoute, {
            username: user.displayName,
            email: user.email,
            photo_url: user.photoURL,
        });
        console.log(res.data);
        if (res.data.status === false){
            toast.warning(res.data.msg, toastProps);
            return false;
        }
        return res.data.user;

    }
    const signInWithGoogle =async () => {
        signInWithPopup(auth, provider).then((result) => {
          console.log(result);
           console.log(result.user);
             
          result.user
            .getIdToken()
            .then((token) => {
            
              console.log('Tokens :  ' + token);

            })
            .then(async() => {
                const status= await registerUser(result.user);
                if (status){
                    localStorage.setItem('react-chat-user', JSON.stringify(status));
                    console.log("User registered");
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });
      };

    useEffect( () => {
        if (localStorage.getItem('react-chat-user')){
            navigate("/");
        }
    }, []);

    function handleChange(e){
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        if (validate()){
            const {username, password} = userInfo;
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
            },{
                withCredentials: true,
              });
            if (data.status === false){
                toast.warning("Username/Password invalid");
                console.log(data.msg);
            }
            if (data.status === true){
                localStorage.setItem('react-chat-user', JSON.stringify(data.returnedUser));
                navigate("/");
            }
        }else{
            console.log("Could not login user");
        }
    }

    function validate(){
        const {username, password} = userInfo;
        if (username === ""){
            toast.warning('The username field cannot be empty', toastProps);
            return false;
        }
        if (password === "" ){
            toast.warning('The password field cannot be empty', toastProps);
            return false;
        }
        return true;
    }

    return (
        <div className="login-container">
            <h1>Welcome!</h1>
            <h2>Please continue to login</h2>
            {/* <BsFillPersonFill className="form-icon"/> */}
            {/* <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <BsFillPersonFill className="form-icon"/>
                    <input 
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <BsLockFill className="form-icon"/>
                    <input 
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <BsArrowRight className="form-icon"/>
                    <button 
                    className="form-btn form-input"
                    type="submit"
                    >Login</button>
                    
                </div>
                <span ><Link className="form-footer" to="/register">Press Here to Register Instead</Link></span>

            </form> */}
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <ToastContainer/>
        </div>
    )
}