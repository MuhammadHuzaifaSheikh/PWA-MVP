import React from "react";
import BottomNav from "../components/BottomNav/BottomNav";
import { onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedTodos } from "../store/Slices/SuggestedSlice";
import { setUserTodoss } from "../store/Slices/UserSlice";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { setSuggestedWeek } from "../store/Slices/WeekSlice";
import { db } from "../config/Firebase";

export default function TodoScreen() {
  const dispatch = useDispatch();
  const { suggestedTodoWeek } = useSelector((state) => state.week);

  console.log("suggestedTodoWeek", suggestedTodoWeek);

  const [suggestedTodoss, setSuggestedTodoss] = React.useState([]);
  const [show, setshow] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const user = useSelector((state) => state.user);
  // const [WEEK, setWEEK] = React.useState(week);
  const user_Todos = user.user_todos;
  const [userTodos, setUserTodos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [suggestedUserTodos, setSuggestedUserTodos] = React.useState([]);

  React.useEffect(() => {
    onSnapshot(collection(db, "suggested_todos"), (snapshot) =>
      setSuggestedTodoss(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, []);

  console.log("suggestedTodoss", suggestedTodoss);

  React.useEffect(() => {
    const filteredTodos = suggestedTodoss.filter(
      (todo) => todo.suggested_todo_week === suggestedTodoWeek
    );
    dispatch(setSuggestedTodos(filteredTodos));
    setSuggestedUserTodos(filteredTodos);
  }, [suggestedTodoss, suggestedTodoWeek]);
  React.useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);

  if (suggestedTodoss?.length > 0) {
    dispatch(setSuggestedTodos(suggestedTodoss));
  }

  const handleAdd = (todo) => {
    console.log("todo", todo);

    const docRef = doc(db, "users", localStorage.getItem("userID"));
    const payload = {
      user_todos: arrayUnion(todo),
    };

    updateDoc(docRef, payload);
    dispatch(setUserTodoss(todo));
  };

  const handleRemove = (todo) => {
    const filteredUserTodos = user.user_todos.filter(
      (obj) => obj.user_todo_id !== todo.id
    );
    const docRef = doc(db, "users", localStorage.getItem("userID"));
    const payload = {
      user_todos: arrayRemove(todo),
    };
    updateDoc(docRef, payload);
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
    dispatch(setSuggestedWeek(payload));
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
        <h1>Week {suggestedTodoWeek}</h1>
      </div>
      {navigator.onLine ? (
        suggestedUserTodos.map((todo) => {
          let isValid = false;
          for (let i = 0; i < user_Todos.length; i++) {
            if (user_Todos[i].id === todo.id) {
              isValid = true;
            }
          }
          return isValid ? (
            // todo.suggested_todo_week === WEEK ? (
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
          ) : (
            //  todo.suggested_todo_week === week ?
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
          );
        })
      ) : (
        <p>You are in offline Mode</p>
      )}
      <div className="week-container">
        <button className="week-checks" onClick={handleToggle}>
          <div></div>
          <div>Week {suggestedTodoWeek}</div>
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
