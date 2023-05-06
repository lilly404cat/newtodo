import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('')
    const [creatorName, setCreatorName] = useState('')
    const [executorName, setExecutorName] = useState('')
    const handleChange = (e) => {
        const {name, value} = e.target
        if (name ==="taskName"){
            setTaskName(value)
        }
        else if(name === "creatorName"){
            setCreatorName(value)
        }
        else if(name === "executorName"){
            setExecutorName(value)
        }
        else {
            setDescription(value)
        }
    }

    const handleSave = () =>{
        let taskObj = {}
        taskObj["Name"]=taskName
        taskObj["Description"] = description
        taskObj["Creator"] = creatorName
        taskObj["Executor"] = executorName
        save(taskObj)
    }
    return (
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
         <form>
            <div className = 'form-group'>
                <label>
                    Task Name
                </label>
                <input type = 'text' className = 'form-control' value = {taskName}
                onChange= {handleChange} name = 'taskName'/>
            </div>
            <div>
                <label>
                    Creator Name 
                </label>
                <input type = 'text' className = 'form-control'  value = {creatorName}
                onChange={handleChange} name = 'creatorName'/>
            </div>
            <div>
                <label>
                Executor Name
                </label>
                <input type = 'text' className = 'form-control'  value = {executorName}
                onChange={handleChange} name = 'executorName'/>
            </div>
            <div className = 'form-group'>
                <label>Task Description</label>
                <textarea rows = '5' className='form-control' value = {description}
                onChange={handleChange} name='description'>

                </textarea>
            </div>
         </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Create
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
};

export default CreateTask;