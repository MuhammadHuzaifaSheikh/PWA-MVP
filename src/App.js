import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux'
import { db } from "./config/Firebase";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import DOB from "./screens/DOBScreen";
import HomeScreen from "./screens/HomeScreen";
import TodoScreen from "./screens/TodoScreen";
import Blog from "./screens/Blog";
import TaskScreen from "./screens/TaskScreen";
import SettingScreen from "./screens/SettingScreen";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import InstaScreen from "./screens/InstaScreen";
import { collection, query, where, getDocs } from "firebase/firestore";
import { setBlogs } from "./store/Slices/BlogSlice";
import { setBaby } from "./store/Slices/BabySlice";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedWeek, setMyTodoWeek } from "./store/Slices/WeekSlice";

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
} from "./store/Slices/UserSlice";
function App() {
  const dispatch = useDispatch();
  const day = useSelector((state) => state.week.day);

  const week = useSelector((state) => state.week.week);
  useEffect(() => {
    async function getUser() {
      const docRef = doc(db, "users", localStorage.getItem("userID"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch(setUserName(docSnap.data().username));
        dispatch(setAddToMyTask(docSnap.data().addToMyTasks));
        dispatch(setEmailAddress(docSnap.data().emailAddress));
        dispatch(setUserId(docSnap.data().id));
        dispatch(setSuggestedWeek(week));
        dispatch(setMyTodoWeek(week));
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
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getDailyArticles() {
      let arr = [];
      const q = query(
        collection(db, "daily_articles"),
        where("article_day", "==", day)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setBlogs(arr));
    }
    getDailyArticles();
  }, [day]);

  useEffect(() => {
    async function getBabyDetails() {
      const q = query(
        collection(db, "baby_size"),
        where("baby_week", "==", week)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("baby size", doc.data());
        dispatch(setBaby({ id: doc.id, ...doc.data() }));
      });
    }
    getBabyDetails();
  }, [week]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dob"
          element={
            <PrivateRoute redirectTo="/login">
              <DOB />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login">
              <HomeScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/task"
          element={
            <PrivateRoute redirectTo="/login">
              <TaskScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <PrivateRoute redirectTo="/login">
              <TodoScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PrivateRoute redirectTo="/login">
              <Blog />
            </PrivateRoute>
          }
        />
        <Route
          path="/settingscreen"
          element={
            <PrivateRoute redirectTo="/login">
              <SettingScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/privacypolicy"
          element={
            <PrivateRoute redirectTo="/login">
              <PrivacyPolicy />
            </PrivateRoute>
          }
        />

        <Route
          path="/instascreen"
          element={
            <PrivateRoute redirectTo="/login">
              <InstaScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
function PrivateRoute({ children, redirectTo }) {
  let isAuthenticated = localStorage.getItem("userID") ? true : false;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
