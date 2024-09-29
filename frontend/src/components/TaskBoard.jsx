// components/TaskBoard.js

import React, { useEffect, useState } from "react";
import SwimLane from "./SwimLane";
import TaskModal from "./TaskModal";
import AddTaskModal from "./AddTaskModal";
import { getTasks, createTask, updateTask } from "../services/taskService";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [draggingTask, setDraggingTask] = useState(null);
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const taskList = await getTasks();
    setTasks(taskList);
  };

  const handleTaskClick = (task) => {
    console.log("hiii");
    console.log(task);
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    await updateTask(updatedTask._id, updatedTask);
    loadTasks();
  };

  const handleAddTask = async (newTask) => {
    await createTask(newTask);
    loadTasks();
  };

  const onDragStart = async (task) => {
    setDraggingTask(task);
  };
  const onDrop = async (statusLane) => {
    if (draggingTask.status !== statusLane)
      handleUpdateTask({ ...draggingTask, status: statusLane });
    setDraggingTask(null);
  };
  return (
    <div className="task-board">
      <h2>Task Management Board</h2>

      {/* Add Task Button */}
      <button onClick={() => setAddModalOpen(true)}>Add Task</button>

      {/* Swim Lane Container */}
      <div className="lane-container">
        {/* Swim Lanes */}
        <SwimLane
          onDragStart={onDragStart}
          onDrop={() => onDrop("To Do")}
          title="To Do"
          tasks={tasks.filter((task) => task.status === "To Do")}
          onClickTask={handleTaskClick}
        />
        <SwimLane
          onDragStart={onDragStart}
          onDrop={() => onDrop("In Progress")}
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "In Progress")}
          onClickTask={handleTaskClick}
        />
        <SwimLane
          onDragStart={onDragStart}
          onDrop={() => onDrop("Done")}
          title="Done"
          tasks={tasks.filter((task) => task.status === "Done")}
          onClickTask={handleTaskClick}
        />
      </div>

      {/* Task Modal for editing/updating task */}
      <TaskModal
        task={selectedTask}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={handleUpdateTask}
      />

      {/* Add Task Modal for creating new task */}
      <AddTaskModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default TaskBoard;
