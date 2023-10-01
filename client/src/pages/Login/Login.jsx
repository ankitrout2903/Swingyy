import { BsArrowRight } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import googleIcon from './google-icon.png.png'; // Import the Google icon image
import './style.css';
import {FcGoogle} from 'react-icons/fc'

export default function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const toastProps = {
    className: "custom-toast",
    draggable: false,
    autoClose: 7000,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "colored",
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        console.log(result.user);

        result.user
          .getIdToken()
          .then((token) => {
            console.log('Tokens: ' + token);
          })
          .catch((error) => {
            console.log(error);
          });

        // Handle user registration with your backend here
        // ...

        localStorage.setItem('react-chat-user', JSON.stringify(result.user));
        console.log("User registered");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('react-chat-user')) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
        <button onClick={() => signInWithGoogle()} className="google-login"><FcGoogle></FcGoogle> Continue With Google</button>
      <ToastContainer />
    </div>
  );
}
