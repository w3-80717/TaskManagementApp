import React, { useState } from 'react';
import './TaskModal.css'
const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (taskData.title.trim() === '') return;
    onAddTask(taskData);
    setTaskData({ title: '', description: '' });
    onClose();
  };

  if (!isOpen) return null; 

  return (
    <div className="modal">
      <div className="modal-content-wrapper">
      <div className="modal-content">
        <h2>Add Task</h2>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={taskData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={taskData.description}
          onChange={handleChange}
        />
        <div>
          <button onClick={handleSubmit}>Add Task</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddTaskModal;
