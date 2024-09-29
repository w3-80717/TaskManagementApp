import React from "react";

const TaskCard = ({ task, onClick, onDragStart }) => {
  return (
    <div
      draggable="true"
      onDragStart={() => onDragStart(task)}
      className="task-card"
      onClick={() => onClick(task)}
    >
      <h4>{task.title}</h4>
      <p>{task.status}</p>
    </div>
  );
};

export default TaskCard;
