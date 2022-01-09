import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginBottom from "../components/LoginBottom/LoginBottom";
import TextField from "@mui/material/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
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

  let [userId, setUserIdd] = React.useState("");
  let [userDocs, setUserDocs] = React.useState([]);
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [loading, setLoading] = React.useState(false);

  const signin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserIdd(userCredential);
        onSnapshot(collection(db, "users"), (snapshot) =>
          setUserDocs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        );
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        console.log(error.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    const loggedInUser = userDocs?.filter((user) => {
      return user.id === userId.user.uid;
    });
    if (loggedInUser.length > 0) {
      localStorage.setItem("userID", loggedInUser[0].id);
      dispatch(setUserName(loggedInUser[0].username));
      dispatch(setAddToMyTask(loggedInUser[0].addToMyTasks));
      dispatch(setEmailAddress(loggedInUser[0].emailAddress));
      dispatch(setUserId(loggedInUser[0].id));
      dispatch(
        setPregnancyDueDate(
          loggedInUser[0].pregnancy_dueDate
            ? loggedInUser[0].pregnancy_dueDate
            : ""
        )
      );
      dispatch(
        setUserTodoss(
          loggedInUser[0].user_todos ? loggedInUser[0].user_todos : []
        )
      );
      dispatch(
        setBabyName(
          loggedInUser[0].pregnancy_babyName
            ? loggedInUser[0].pregnancy_babyName
            : ""
        )
      );
      dispatch(
        setBabyGender(
          loggedInUser[0].pregnancy_babyGender
            ? loggedInUser[0].pregnancy_babyGender
            : ""
        )
      );
      dispatch(
        setBabyGender(
          loggedInUser[0].pregnancy_babyGender
            ? loggedInUser[0].pregnancy_babyGender
            : ""
        )
      );
      dispatch(
        setFullName(loggedInUser[0].fullName ? loggedInUser[0].fullName : "")
      );

      navigate("/");
    }
  }, [userDocs, userId, dispatch, navigate]);

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
              defaultValue="Hello World"
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
