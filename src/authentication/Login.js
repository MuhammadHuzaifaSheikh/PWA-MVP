import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginBottom from "../components/LoginBottom/LoginBottom";
import TextField from "@mui/material/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/Firebase";
import {
  setUserId,
  setUserName,
  setFullName,
  setAddToMyTask,
  setEmailAddress,
  setPregnancyDueDate,
  setUserTodoss,
  setBabyName,
  setBabyGender,
} from "../store/Slices/UserSlice";
import "../index.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [loading, setLoading] = React.useState(false);

  const signin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("userID", userCredential.user.uid);
        getUser();
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  async function getUser() {
    const docRef = doc(db, "users", localStorage.getItem("userID"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch(setUserName(docSnap.data().username));
      dispatch(setAddToMyTask(docSnap.data().addToMyTasks));
      dispatch(setEmailAddress(docSnap.data().emailAddress));
      dispatch(setUserId(docSnap.data().id));

      dispatch(
        setPregnancyDueDate(
          docSnap.data().pregnancy_dueDate
            ? docSnap.data().pregnancy_dueDate
            : ""
        )
      );
      dispatch(
        setUserTodoss(
          docSnap.data().user_todos ? docSnap.data().user_todos : []
        )
      );
      dispatch(
        setBabyName(
          docSnap.data().pregnancy_babyName
            ? docSnap.data().pregnancy_babyName
            : ""
        )
      );
      dispatch(
        setBabyGender(
          docSnap.data().pregnancy_babyGender
            ? docSnap.data().pregnancy_babyGender
            : ""
        )
      );
      dispatch(
        setBabyGender(
          docSnap.data().pregnancy_babyGender
            ? docSnap.data().pregnancy_babyGender
            : ""
        )
      );
      dispatch(
        setFullName(docSnap.data().fullName ? docSnap.data().fullName : "")
      );
      navigate("/");
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <div>
      {/* Logo  */}

      <div className="border">
        <div className="div-1">
          <div className="logo-main">
            <div className="logo">
              <i className="fas fa-shopping-bag"></i>
            </div>
          </div>

          {/* login heading  */}

          <div>
            <h1 className="log-in">Log-In</h1>
          </div>
        </div>

        <div className="div-2">
          <div className="top"></div>

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
              label="Password"
              type="password"
            />
          </div>

          {/* remember me */}

          <div className="remember">
            <div>
              <p>remember me</p>
            </div>
          </div>

          {/* log-in button */}

          <div onClick={signin} className="log-in-button">
            <button className="text">
              {loading ? (
                <>
                  <span className="spinner"></span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <Link to="/signup">
            <p className="text-center underline create-an-acc">
              Create An Account
            </p>
          </Link>
        </div>
        <div className="div-3"></div>

        <LoginBottom />
      </div>
    </div>
  );
}
