import React from "react";
import TaskCard from "./TaskCard";

const SwimLane = ({ title, tasks, onClickTask, onDragStart, onDrop }) => {
  return (
    <div onDrop={onDrop}  onDragOver={(e) => {e.preventDefault(); }} className="swim-lane">
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard
          onDragStart={onDragStart}
          key={task._id}
          task={task}
          onClick={onClickTask}
        />
      ))}
    </div>
  );
};

export default SwimLane;
