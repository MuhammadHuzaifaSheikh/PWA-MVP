import React, { useState, useRef, useEffect } from "react";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";
import { onSnapshot, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../store/Slices/BlogSlice";
import { setWeek } from "../store/Slices/WeekSlice";
import { db } from "../config/Firebase";

function HomeScreen() {
  const currentDate = useRef();
  const dispatch = useDispatch();
  const [DAYS, setDAYS] = useState([]);
  const { pregnancy_dueDate } = useSelector((state) => state.user);
  const [DATES, setDATES] = React.useState([]);
  const [day, setDay] = React.useState();
  const [WEEK, setWEEK] = React.useState();
  const [selected, setSelected] = React.useState();
  const [baby, setBaby] = React.useState([]);
  const [blogs, setBlogss] = React.useState([]);

  const [allDays, setAllDays] = useState([]);

  console.log(pregnancy_dueDate);

  useEffect(() => {
    const remainingDays = Math.ceil(
      new Date(
        Date.now() - (pregnancy_dueDate - 280 * 24 * 60 * 60 * 1000)
      ).getTime() /
        1000 /
        60 /
        60 /
        24 -
        8
    );

    for (let i = 0; i < 40; i++) {
      let dayNames = ["S", "M", "T", "W", "T", "F", "S"];
      DAYS.push(...dayNames);
    }

    const week = Math.ceil(remainingDays / 7);
    setDay(remainingDays);
    setWEEK(week);
    setSelected(remainingDays);
    dispatch(setWeek(week));

    let arr = [];
    let a = week * 7;

    let days = [];

    for (let i = 1; i <= 280; i++) {
      days.push(i);
    }
    setAllDays(days);

    for (let i = a - 6; i <= a; i++) {
      arr.push(i);
    }
    setDATES(arr);
  }, [dispatch, pregnancy_dueDate]);

  useEffect(() => {
    console.log(day);
    if (day && document.getElementById(day.toString())) {
      document.getElementById(day.toString()).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [allDays, day]);

  const handlePrevious = () => {
    if (WEEK > 1) {
      let arr = [];
      const week = WEEK - 1;
      let a = week * 7;
      for (let i = a - 6; i <= a; i++) {
        arr.push(i);
      }
      setDATES(arr);
      setWEEK(WEEK - 1);
      dispatch(setWeek(WEEK - 1));
      console.log(WEEK * 7 - 6);

      document.getElementById((WEEK * 7 - 13).toString()).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const handleAgo = () => {
    if (WEEK < 40) {
      const week = WEEK + 1;
      let a = week * 7;
      let arr = [];
      for (let i = a - 6; i <= a; i++) {
        arr.push(i);
      }
      setDATES(arr);
      setWEEK(WEEK + 1);
      dispatch(setWeek(WEEK + 1));

      console.log(WEEK * 7 - 6);

      document.getElementById((WEEK * 7 + 6).toString()).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSelectedChange = (date) => {
    setSelected(date);

    console.log(Math.ceil(date / 7));

    setWEEK(Math.ceil(date / 7));
  };

  React.useEffect(() => {
    onSnapshot(collection(db, "daily_articles"), (snapshot) =>
      setBlogss(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    onSnapshot(collection(db, "baby_size"), (snapshot) =>
      setBaby(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, []);

  console.log("baby", baby);

  if (blogs?.length > 0) {
    dispatch(setBlogs(blogs));
  }
  //   if (baby?.length > 0) {
  //     let filteredBaby = baby.find((baby) => baby.baby_week === WEEK);
  //     setBaby(filteredBaby);
  //     console.log("filteredBaby", filteredBaby);
  //   }

  return (
    <div className="flex-1">
      <div className="flex flex-row justify-between margin10">
        <div className="none"></div>
        <div className="flex flex-row week">
          <div>
            <i
              onClick={handlePrevious}
              className="fa fa-chevron-left"
              aria-hidden="true"
            ></i>
          </div>
          <div className="f">
            <p>Week {pregnancy_dueDate ? WEEK : 1}</p>
          </div>
          <div>
            <i
              onClick={handleAgo}
              className="fa fa-chevron-right"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <div>
          <Link to="/settingscreen">
            <img
              className="avatar-img"
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              alt="avatar"
            />
          </Link>
        </div>
      </div>
      {/* calendar */}

      <div className="calenderWrapper">
        <div className="calnder">
          {DAYS.map((e, i) => {
            return (
              <div key={i}>
                <p className="dayNameItem">{e}</p>
              </div>
            );
          })}
        </div>

        <div className="calnder margincal">
          {allDays.map((e, i) => {
            return (
              <div key={i} id={e.toString()}>
                <p
                  onClick={() => handleSelectedChange(e)}
                  className={`dayNumberItem ${day === e && "purple"} ${
                    selected === e && "selected"
                  }`}
                >
                  {e}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="blogs-container">
        <div className="img">
          <img src={baby[0]?.baby_fruiteImg} alt="pic" />
        </div>
        <div className="babysize">
          <div>
            <p>Your Baby's Size</p>
          </div>
          <div className="main">
            <div className="lenght-main">
              <div className="lenght">
                <p>Length</p>
              </div>
              <div className="fit">
                <h3>{baby[0]?.baby_length}</h3>
              </div>
              <div className="fir2">
                <h6>cm</h6>
              </div>
            </div>
            <div>
              <div className="lenght">
                <p>Weight</p>
              </div>
              <div className="fit">
                <h3>{baby[0]?.baby_weight}</h3>
              </div>
              <div className="fir2">
                <h6>g</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="weekly-outlook">
          <h1>Your Weekly Outlook</h1>
        </div>
        {blogs.length > 0 ? (
          blogs?.map((blog, index) => {
            return blog.article_day === selected ? (
              <>
                <Card blog={blog} key={index} />
              </>
            ) : null;
          })
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default HomeScreen;
