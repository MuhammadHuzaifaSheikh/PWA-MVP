import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { auth } from "../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {
  setUserId,
  setUserName,
  setEmailAddress,
} from "../store/Slices/UserSlice";
import { db } from "../config/Firebase";
import "../index.css";

export default function SignUp() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let signup_user = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed Up
        const collectionRef = collection(db, "users");
        const payload = {
          username: username,
          emailAddress: userCredential.user.email,
          userId: userCredential.user.uid,
        };
        addDoc(collectionRef, payload)
          .then((docRef) => {
            localStorage.setItem("userID", userCredential.user.uid);
            dispatch(setUserName(username));
            dispatch(setEmailAddress(userCredential.user.email));
            dispatch(setUserId(userCredential.user.uid));
            navigate("/dob");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    return () => {
      setUsername("");
      setEmail();
      setPassword();
      setLoading(false);
    };
  }, []);

  return (
    <div>
      {/* Logo  */}

      <div className="border">
        <div className="div-1">
          <div className="logo-main">
            <div className="logo">
              <i className="fas fa-shopping-bag"> </i>{" "}
            </div>{" "}
          </div>{" "}
          {/* login heading  */}{" "}
          <div>
            <h1 className="log-in">SignUp </h1>{" "}
          </div>{" "}
        </div>
        <div className="div-2">
          <div className="top"> </div>{" "}
          <div className="input-main-div">
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="input"
              required
              id="outlined-required"
              label="Username"
              type="text"
            />
          </div>
          {/* email input */}
          <div className="input-main-div">
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input"
              required
              id="outlined-required"
              label="Email Address"
              type="email"
            />
          </div>
          {/* pass input */}
          <div className="input-main-div">
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input"
              required
              id="outlined-required"
              type="password"
              label="Password"
            />
          </div>
          {/* remember me */}
          <div className="remember">
            <div>
              <p> remember me </p>{" "}
            </div>{" "}
          </div>
          {/* log-in button */}
          {/* <div onClick={signup_user} className='log-in-button'>
                                    <button className='text'></button>
                                </div> */}{" "}
          <div onClick={signup_user} className="log-in-button">
            <button className="text">
              {" "}
              {loading ? (
                <>
                  <span className="spinner"> </span>{" "}
                </>
              ) : (
                "Sign Up"
              )}{" "}
            </button>{" "}
          </div>{" "}
          <Link to="/">
            <p className="text-center underline create-an-acc">
              {" "}
              i 've Already Account
            </p>{" "}
          </Link>
        </div>{" "}
        <div className="div-3"></div>
      </div>
    </div>
  );
}
