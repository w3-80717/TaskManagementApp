const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  addComment,
  deleteTask
} = require('../controllers/taskController.js');
const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.post('/:id/comments', addComment);
router.delete('/:id', deleteTask);

module.exports = router;
