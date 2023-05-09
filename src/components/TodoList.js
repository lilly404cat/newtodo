import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card'

const API_URL = 'http://localhost:5000/api/tasks';


const TodoList = ({ onToggleDarkMode, isDarkModeEnabled }) => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [showFirstDiv, setShowFirstDiv] = useState(false);
    const [showSecondDiv, setShowSecondDiv] = useState(false);
    const [showThirdDiv, setShowThirdDiv] = useState(false);

    const handleTutorialButtonClick = () => {
      setShowFirstDiv(true);
    };
  
    const handleFirstDivButtonClick = () => {
      setShowFirstDiv(false);
      setShowSecondDiv(true);
    };
  
    const handleSecondDivButtonClick = () => {
      setShowSecondDiv(false);
      setShowThirdDiv(true);
    };
  
    const handleThirdDivButtonClick = () => {
      setShowThirdDiv(false);
    };

    useEffect(() => {
        fetch(API_URL)
          .then((response) => response.json())
          .then((data) => {setTaskList(data.tasks); console.log(data);})
          .catch((error) => console.error(error));
      }, []);

    const toggle = () => setModal(!modal);

    const deleteTask = (index, _id) => {
        fetch(`${API_URL}/${_id}`, { method: 'DELETE' })
          .then(() => {
            const tempList = [...taskList];
            tempList.splice(index, 1);
            setTaskList(tempList);
          })
          .catch((error) => console.error(error));
      };

      const updateListArray = (obj, index) => {
        fetch(`${API_URL}/${obj._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        })
          .then(() => {
            const tempList = [...taskList];
            tempList[index] = obj;
            setTaskList(tempList);
          })
          .catch((error) => console.error(error));
      };

      const saveTask = (taskObj) => {
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskObj),
        })
          .then((response) => response.json())
          .then((data) => {
            const tempList = [...taskList];
            tempList.push(data);
            console.log(tempList);
            setTaskList(tempList);
            setModal(false);
          })
          .catch((error) => console.error(error));
      };

    return (
      <div className="main-div">
        <div className = 'header text-center'>
        {isDarkModeEnabled ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              onClick={handleTutorialButtonClick}
              className="darkmodeButton"
              src="tutorial-white.png"
              alt="Sun"
            ></img>
            <img
              onClick={onToggleDarkMode}
              className="darkmodeButton"
              src="sun.png"
              alt="Sun"
            ></img>
            {showThirdDiv && (
              <div
                class="right-box-third"
                id="thirdTutorial"
                style={{ display: "block" }}
              >
                <p
                  style={{
                    color: "white",
                    "font-size": "18px",
                    "line-height": "1.5",
                    "font-weight": "400",
                  }}
                >
                  Use this button to toggle darkmode
                </p>
                <div class="align-left">
                  <button
                    class="close-tutorial"
                    id="gotThird"
                    onClick={handleThirdDivButtonClick}
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              onClick={handleTutorialButtonClick}
              className="darkmodeButton"
              src="tutorial.png"
              alt="Sun"
            ></img>
            <img
              onClick={onToggleDarkMode}
              className="darkmodeButton"
              src="moon.png"
              alt="Sun"
            ></img>
            {showThirdDiv && (
              <div
                class="right-box-third"
                id="thirdTutorial"
                style={{ display: "block" }}
              >
                <p
                  style={{
                    color: "white",
                    "font-size": "18px",
                    "line-height": "1.5",
                    "font-weight": "400",
                  }}
                >
                  Use this button to toggle darkmode
                </p>
                <div class="align-left">
                  <button
                    class="close-tutorial"
                    id="gotThird"
                    onClick={handleThirdDivButtonClick}
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
            <h3>ToDo List</h3>
            <button color = "#fc0330" className='btn btn-primary mt-2' 
            onClick = {() => setModal(true)}> Create Task</button>
            {showFirstDiv && (
          <div
            class="right-box"
            id="firstTutorial"
            style={{ display: "block" }}
          >
            <p
              style={{
                color: "white",
                "font-size": "18px",
                "line-height": "1.5",
                "font-weight": "400",
              }}
            >
              Use this button to add a new ToDo
            </p>
            <div class="align-left">
              <button
                class="close-tutorial"
                id="gotFirst"
                onClick={handleFirstDivButtonClick}
              >
                Got it!
              </button>
            </div>
          </div>
        )}
        </div>

        <div className = 'task-container'>
        {showSecondDiv && (
          <div class="top-box" id="firstTutorial" style={{ display: "block" }}>
            <p
              style={{
                color: "white",
                "font-size": "18px",
                "line-height": "1.5",
                "font-weight": "400",
              }}
            >
              Here you can see all the ToDos. You can edit or delete them.
            </p>
            <div class="align-left">
              <button
                class="close-tutorial"
                id="gotFirst"
                onClick={handleSecondDivButtonClick}
              >
                Got it!
              </button>
            </div>
          </div>
        )}
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              key={obj._id}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
          </div>
        <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </div>
    );
};

export default TodoList;