import { useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import axios from 'axios';
import googleIcon from './google-icon.png.png'; // Import the Google icon image
import './style.css';
import { checkUserRoute, loginRoute, registerRoute } from "../../utils/APIRoutes";
import {FcGoogle} from 'react-icons/fc'

export default function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  var username = null;
  var user = null;
  var uid = null;
  var pass = null;
  var mail = null;
  var existing = null
  const toastProps = {
    className: "custom-toast",
    draggable: false,
    autoClose: 7000,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "colored",
  };

  async function validate({ username, uid, password, mail}) {
    existing = await axios.post(checkUserRoute, { //check if the user exists
      mail,
    }, {
      withCredentials: true
    });
    if (existing.data.status === false) {
      const data = await axios.post(registerRoute, { //if not create one.
        username,
        mail,
        password,
        uid,
      }, {
        withCredentials: true
      });
      localStorage.setItem("id", JSON.stringify(data.data.user._id));
    } else {
      console.log('existing');
      const existUser = existing.data.user;
      const _id = existUser._id;
      console.log(_id);
      console.log(existing.data)
      localStorage.setItem("_id", JSON.stringify(_id)); //if yes, add data to localstorage
      // localStorage.setItem("react-chat-user", JSON.stringify(existing.returnedUser));
    }
  }

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('in results:'+result);
        console.log(result.user);
        user = result.user;
        uid = user.uid;
        mail = user.email;
        username = user.displayName;

        result.user
          .getIdToken()
          .then((token) => {
            // the idea is to add the user to our DB if they login with google, because otherwise we can't really do anything.
            validate({ username, uid, pass, mail });
            console.log('Tokens: ' + token);
          })
          .catch((error) => {
            console.log(error);
          });

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
