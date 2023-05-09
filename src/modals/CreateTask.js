import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const API_URL = 'http://localhost:5000/api/tasks';

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

const handleSave = async () => {
    const taskObj = {
      taskName: taskName,
      description: description,
      creatorName: creatorName,
      executorName: executorName,
    }
    try {
        save(taskObj);
        setTaskName(''); 
        setDescription('');
        setCreatorName('');
        setExecutorName(''); 
        toggle(); // close the modal
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Create New Task</ModalHeader>
          <ModalBody>
            <form>
              <div className='form-group'>
                <label>Task Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={taskName}
                  onChange={handleChange}
                  name='taskName'
                />
              </div>
              <div>
                <label>Creator Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={creatorName}
                  onChange={handleChange}
                  name='creatorName'
                />
              </div>
              <div>
                <label>Executor Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={executorName}
                  onChange={handleChange}
                  name='executorName'
                />
              </div>
              <div className='form-group'>
                <label>Task Description</label>
                <textarea
                  rows='5'
                  className='form-control'
                  value={description}
                  onChange={handleChange}
                  name='description'
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleSave}>
              Create
            </Button>{' '}
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      );
    };

export default CreateTask;

