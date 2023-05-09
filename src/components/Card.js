import React, {useState} from 'react';
import EditTask from '../modals/EditTask'
const API_URL = 'http://localhost:5000/api/tasks';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/${taskObj._id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                deleteTask(index,taskObj._id);
            } else {
                console.error('Error deleting task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    const colors = [
        {
          primaryColor: "#5D93E1",
          secondaryColor: "#ECF3FC",
        },
        {
          primaryColor: "#F9D288",
          secondaryColor: "#FEFAF1",
        },
        {
          primaryColor: "#5DC250",
          secondaryColor: "#F2FAF1",
        },
        {
          primaryColor: "#F48687",
          secondaryColor: "#FDF1F1",
        },
        {
          primaryColor: "#B964F7",
          secondaryColor: "#F3F0FD",
        },
      ];

    return (
        <div className = "card-wrapper mr-5">
        <div className = "card-top"
         style={{"background-color": colors[index%5].primaryColor}}>
         </div>
        <div className = "task-holder">
            <label className="text">Task</label>
            <span 
               class = "card-header" 
               style={{
                "background-color": colors[index%5].secondaryColor, 
                "border-radius": "10px",
                "font-weight": "bold",
                }}>
                {taskObj.taskName}</span>
                <label className="text"> Creator </label>
            <span class = "card-header" 
            style={{
            "background-color": colors[index%5].secondaryColor, 
            "border-radius": "10px",
            "font-weight": "bold"
            }}>
                {taskObj.creatorName}</span>
                <label className="text">
               Executor
            </label>
            <span class = "card-header" 
            style={{
            "background-color": colors[index%5].secondaryColor, 
            "border-radius": "10px",
            "font-weight": "bold"
            }}>
            {taskObj.executorName}</span>

            <p className = "mt-5 text">{taskObj.description}</p>
            <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                <i class="far fa-edit mr-3"  style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} 
                onClick = {() => setModal(true)}></i>{'   '}
                <i class="fas fa-trash-alt" aria-hidden="true" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}}
                 onClick = {handleDelete}></i>
            </div>
    </div>
    <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} 
    taskObj = {taskObj}/>
    </div>
    );
};

export default Card;