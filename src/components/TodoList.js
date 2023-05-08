import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = ({ onToggleDarkMode, isDarkModeEnabled }) => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);
  const toggle = () => setModal(!modal);
  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };
  return (
    <div className="main-div">
      <div className="header text-center">
        {isDarkModeEnabled ? (
          <img
            onClick={onToggleDarkMode}
            className="darkmodeButton"
            src="sun.png"
            alt="Sun"
          ></img>
        ) : (
          <img
            onClick={onToggleDarkMode}
            className="darkmodeButton"
            src="moon.png"
            alt="Sun"
          ></img>
        )}

        <h3>ToDo List</h3>
        <button
          color="#fc0330"
          className="btn btn-primary mt-2"
          onClick={() => setModal(true)}
        >
          {" "}
          Create Task
        </button>
      </div>

      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};

export default TodoList;
