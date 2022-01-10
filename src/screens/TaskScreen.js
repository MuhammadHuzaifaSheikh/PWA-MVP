import React from "react";
import BottomNav from "../components/BottomNav/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import { setUserTodoss } from "../store/Slices/UserSlice";
import { setDoc, doc } from "firebase/firestore";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { Link } from "react-router-dom";
import { setWeek } from "../store/Slices/WeekSlice";
import { db } from "../config/Firebase";
import { setMyTodoWeek } from "../store/Slices/WeekSlice";

export default function TaskScreen() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = React.useState(true);
  const { myTodoWeek } = useSelector((state) => state.week);

  const [isOpen, setIsOpen] = React.useState(false);
  const [userTodosState, setUserTodosState] = React.useState([]);
  const user = useSelector((state) => state.user);
  let userTodos = user.user_todos;

  console.log("userTodos", userTodos);

  React.useEffect(() => {
    const filteredTodos = userTodos.filter(
      (todo) => todo.suggested_todo_week === myTodoWeek
    );
    // dispatch(setUserTodoss(filteredTodos));
    // setS(filteredTodos);
    console.log("filteredTodos", filteredTodos);
    setUserTodosState(filteredTodos);
  }, [userTodos, myTodoWeek]);

  React.useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);
  const handleTaskComplete = (todo) => {
    console.log("todo", todo);
    // const objIndex = user.user_todos.findIndex(
    //   (obj) => obj.user_todo_id === todo.user_todo_id
    // );
    // let newUserTodos = [];
    // if (objIndex >= 0) {
    //   const status = todo.user_todo_completionStatus;
    //   const user_todo = {
    //     user_todo_id: todo.user_todo_id,
    //     user_todo_completionStatus: !status,
    //     user_todo_title: todo.user_todo_title,
    //     user_todo_week: todo.suggested_todo_week,
    //   };

    //   newUserTodos = userTodos.map((todo, index) => {
    //     return index === objIndex ? user_todo : todo;
    //   });

    //   const docRef = doc(db, "users", localStorage.getItem("userID"));
    //   const payload = {
    //     pregnancy_dueDate: user.pregnancy_dueDate,
    //     emailAddress: user.emailAddress,
    //     username: user.username,
    //     user_todos: [...newUserTodos],
    //     fullName: user.fullName,
    //   };

    //   setDoc(docRef, payload);
    //   dispatch(setUserTodoss(newUserTodos));
    // }
  };

  let dropdownData = [];
  for (let i = 1; i < 41; i++) {
    dropdownData.push(i);
  }
  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleDateChange = (payload) => {
    dispatch(setMyTodoWeek(payload));
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="todo-main-div">
      <div className="suggest">
        <div className="div1">
          <Link to="/todos">
            <button className="button-suggest">suggested</button>
          </Link>
        </div>
        <div className={`div2 ${isActive && "activeScreen"}`}>
          {/* <Link> */}
          <button>My Tasks</button>
          {/* </Link> */}
        </div>
      </div>
      <div className="week-7">
        <h1>Week {myTodoWeek}</h1>
      </div>
      <div className="margin-todos">
        {userTodosState?.map((todo) => {
          return todo.suggested_todo_week === myTodoWeek ? (
            <div className="full-width" key={todo.id}>
              <div className="check-box-div My-todos">
                <div className="todo-content">
                  <p className="">{todo.suggested_todo_title}</p>
                </div>
                <div onClick={() => handleTaskComplete(todo)}>
                  <Checkbox
                    className="check"
                    checked={todo.user_todo_completionStatus ? true : false}
                  />
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>

      <div className="week-container">
        <button className="week-checks" onClick={handleToggle}>
          <div></div>
          <div>Week {myTodoWeek}</div>
          <div>
            <KeyboardArrowDownSharpIcon />
          </div>
        </button>

        <div
          style={isOpen ? {} : { maxHeight: 0 }}
          className="dropdown-contentw dropdown-content"
        >
          <ul className="dropdown-contet-itemsw dropdown-contet-items">
            {dropdownData.map((date, index) => (
              <li
                key={index}
                className="dropdown-contet-itemw dropdown-contet-item"
                onClick={() => {
                  handleDateChange(date);
                }}
              >
                Week {date}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
