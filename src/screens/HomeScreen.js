import React, { useState, useRef, useEffect } from "react";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";
import { onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../store/Slices/BlogSlice";
import { setSuggestedWeek } from "../store/Slices/WeekSlice";
import { collection, query, where, getDocs } from "firebase/firestore";
import { setWeek, setDay } from "../store/Slices/WeekSlice";
import { db } from "../config/Firebase";

function HomeScreen() {
  const currentDate = useRef();
  const dispatch = useDispatch();

  const baby = useSelector((state) => state.baby.baby);
  const blogs = useSelector((state) => state.blog.blogs);
  const { pregnancy_dueDate } = useSelector((state) => state.user);
  const { week, day } = useSelector((state) => state.week);

  const [DAYS, setDAYS] = useState([]);
  const [currentDay, setCurrentDay] = React.useState();

  const [DATES, setDATES] = React.useState([]);
  // const [WEEK, setWEEK] = React.useState();
  const [selected, setSelected] = React.useState(1);

  const [allDays, setAllDays] = useState([]);

  console.log(baby);

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

    const weekCal = Math.ceil(remainingDays / 7);
    // dispatch(setDay(remainingDays));
    setCurrentDay(remainingDays);

    setSelected(remainingDays);
    // dispatch(setWeek(weekCal));

    let arr = [];
    let a = weekCal * 7;

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
    if (day && document.getElementById(day.toString())) {
      document.getElementById(day.toString()).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [allDays, day]);

  const handlePrevious = () => {
    if (week > 1) {
      let arr = [];
      const weekVar = week - 1;
      let a = weekVar * 7;
      for (let i = a - 6; i <= a; i++) {
        arr.push(i);
      }
      setDATES(arr);
      dispatch(setWeek(week - 1));

      document.getElementById((week * 7 - 13).toString()).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const handleAgo = () => {
    if (week < 40) {
      const weekVar = week + 1;
      let a = weekVar * 7;
      let arr = [];
      for (let i = a - 6; i <= a; i++) {
        arr.push(i);
      }
      setDATES(arr);
      dispatch(setWeek(week + 1));

      document.getElementById((week * 7 + 6).toString()).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSelectedChange = (date) => {
    setSelected(date);
    dispatch(setDay(date));
    dispatch(setWeek(Math.ceil(date / 7)));
  };

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
            <p>Week {pregnancy_dueDate ? week : 1}</p>
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
                  className={`dayNumberItem ${currentDay === e && "purple"} ${
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
          <img src={baby?.baby_fruiteImg} alt="pic" />
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
                <h3>{baby?.baby_length}</h3>
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
                <h3>{baby?.baby_weight}</h3>
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
            return (
              <>
                <Card blog={blog} key={index} />
              </>
            );
          })
        ) : (
          <>
            <p>No Article Found For Day {selected}</p>
            {/* <div className="loader-container">
              <div className="loader"></div>
            </div> */}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default HomeScreen;
