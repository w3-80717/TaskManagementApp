const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'To Do' },
  comments: { type: [String], default: [] }, // Array of comments
});

module.exports = mongoose.model('Task', taskSchema);
