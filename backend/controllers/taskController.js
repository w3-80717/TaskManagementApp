const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: "Task creation failed" });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status, comments } = req.body;
  if (!["To Do", "In Progress", "Done"].includes(status)) {
    console.log(status);
    return res.status(401).json({error:"Invalid status"})
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, comments },
      { new: true },
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.addComment = async (req, res) => {
  const { commentText } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.comments.push({ commentText });
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Adding comment failed" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Task deletion failed" });
  }
};
