import React from "react";
import BottomNav from "../components/BottomNav/BottomNav";
import { onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedTodos } from "../store/Slices/SuggestedSlice";
import { setUserTodoss } from "../store/Slices/UserSlice";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { setDoc, doc } from "firebase/firestore";
import { setWeek } from "../store/Slices/WeekSlice";
import { db } from "../config/Firebase";

export default function TodoScreen() {
  const dispatch = useDispatch();
  const [suggestedTodoss, setSuggestedTodoss] = React.useState([]);
  const [show, setshow] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const user = useSelector((state) => state.user);
  const { week } = useSelector((state) => state.week);
  const user_Todos = user.user_todos;
  const [userTodos, setUserTodos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    onSnapshot(collection(db, "suggested_todos"), (snapshot) =>
      setSuggestedTodoss(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, []);

  React.useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);

  if (suggestedTodoss?.length > 0) {
    dispatch(setSuggestedTodos(suggestedTodoss));
  }

  const handleAdd = (todo) => {
    let user_todo = [];
    for (let i = 0; i < userTodos.length; i++) {
      user_todo.push(userTodos[i]);
    }
    user_todo.push({
      user_todo_id: todo.id,
      user_todo_completionStatus: false,
      user_todo_title: todo.suggested_todo_title,
      user_todo_week: todo.suggested_todo_week,
    });
    setUserTodos(user_todo);
    const docRef = doc(db, "users", localStorage.getItem("userID"));
    const payload = {
      pregnancy_dueDate: user.pregnancy_dueDate,
      emailAddress: user.emailAddress,
      username: user.username,
      user_todos: [...user_todo],
      fullName: user.fullName,
      addToMyTasks: true,
    };

    setDoc(docRef, payload);
    dispatch(setUserTodoss(user_todo));
  };

  const handleRemove = (todo) => {
    const filteredUserTodos = user.user_todos.filter(
      (obj) => obj.user_todo_id !== todo.id
    );
    const docRef = doc(db, "users", localStorage.getItem("userID"));
    const payload = {
      pregnancy_dueDate: user.pregnancy_dueDate,
      emailAddress: user.emailAddress,
      username: user.username,
      user_todos: [...filteredUserTodos],
      fullName: user.fullName,
    };
    setDoc(docRef, payload);
    dispatch(setUserTodoss(filteredUserTodos));
  };
  let dropdownData = [];
  for (let i = 1; i < 41; i++) {
    dropdownData.push(i);
  }
  React.useEffect(() => {}, []);

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const handleDateChange = (payload) => {
    dispatch(setWeek(payload));
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div className="todo-main-div">
      <div className="suggest">
        <div className={`div1 ${isActive && "activeScreen"}`}>
          <button className="button-suggest">suggested</button>
        </div>
        <div className="div2">
          <Link to="/task">
            <button>My Tasks</button>
          </Link>
        </div>
      </div>
      <div className="week-7">
        <h1>Week {week}</h1>
      </div>
      {navigator.onLine ? (
        suggestedTodoss.map((todo) => {
          let isValid = false;
          for (let i = 0; i < user_Todos.length; i++) {
            if (user_Todos[i].user_todo_id === todo.id) {
              isValid = true;
            }
          }
          return isValid ? (
            todo.suggested_todo_week === week ? (
              <div key={todo.id} className="full-width">
                <div className="check-box-div My-todos">
                  <div className={show ? `todo-content` : `todo-content minus`}>
                    <p className="">{todo.suggested_todo_title}</p>
                  </div>
                  <div className="box-minus" onClick={() => handleRemove(todo)}>
                    <div>
                      <i className="fa fa-minus"></i>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          ) : todo.suggested_todo_week === week ? (
            <div className="full-width" key={todo.id}>
              <div className="My-todos">
                <div className="todo-content">
                  <p className="">{todo.suggested_todo_title}</p>
                </div>
                <div
                  className="box"
                  onClick={() => {
                    handleAdd(todo);
                  }}
                >
                  <div>
                    <i className="fa fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        })
      ) : (
        <p>You are in offline Mode</p>
      )}
      <div className="week-container">
        <button className="week-checks" onClick={handleToggle}>
          <div></div>
          <div>Week {week}</div>
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
