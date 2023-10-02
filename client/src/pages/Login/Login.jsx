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
    <div class="wrapper">
      <span class="borderLine"></span>
      <h1>
        <span>S</span>wingyy
      </h1>
      <div class="description">
        <p>
          Swingyy is a real-time chat application that allows users to connect
          and communicate with their friends instantly. With Swingyy, you can
          send and receive messages in real-time, mark messages as seen or
          unseen, and stay updated with the online/offline status of your
          friends.
        </p>
      </div>
      <button type="submit" class="btn" onClick={() => signInWithGoogle()}>
        <div>
          <FcGoogle />
        </div>
      </button>

      <div class="text">
        <p>Login Now</p>
      </div>
    </div>
  );
}
