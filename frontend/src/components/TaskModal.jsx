import React, { useState, useEffect } from "react";
import "./TaskModal.css"; // For updated styles

const TaskModal = ({ task, isOpen, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    if (task) {
      setUpdatedTask(task);
    }
  }, [task]);

  if (!isOpen || !updatedTask) return null;

  const updateTaskInBackend = async (updatedTaskData) => {
    try {
      await onUpdate(updatedTaskData);
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const updatedComments = [...(updatedTask.comments || []), newComment];
    const newTaskData = { ...updatedTask, comments: updatedComments };

    setUpdatedTask(newTaskData);
    setNewComment("");

    updateTaskInBackend(newTaskData);
  };

  const handleDeleteComment = (indexToDelete) => {
    const filteredComments = updatedTask.comments.filter(
      (_, index) => index !== indexToDelete,
    );
    const newTaskData = { ...updatedTask, comments: filteredComments };

    setUpdatedTask(newTaskData);

    updateTaskInBackend(newTaskData);
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditedComment(updatedTask.comments[index]);
  };

  const handleSaveEditedComment = () => {
    const updatedComments = [...updatedTask.comments];
    updatedComments[editingCommentIndex] = editedComment;
    const newTaskData = { ...updatedTask, comments: updatedComments };

    setUpdatedTask(newTaskData);
    setEditingCommentIndex(null);

    updateTaskInBackend(newTaskData);
  };

  const handleCancelEditComment = () => {
    setEditingCommentIndex(null);
    setEditedComment("");
  };

  const handleUpdateField = (field, value) => {
    setUpdatedTask({ ...updatedTask, [field]: value });
    updateTaskInBackend({ ...updatedTask, [field]: value });
  };

  const getStatusStyleClass = (status) => {
    switch (status) {
      case "To Do":
        return "to-do";
      case "In Progress":
        return "in-progress";
      case "Done":
        return "done";
    }
  };

  return (
    <div className="modal">
      <div className="modal-content-wrapper">
        <div className="modal-content">
          {/* Modal close button */}
          <button className="close-modal-button" onClick={onClose}>
            &#10005;
          </button>

          {/* Title and Status Dropdown */}
          <div className="task-head">
            {/* Task title input with floating tick and cross */}
            <div className="field-container">
              <input
                type="text"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, title: e.target.value })
                }
                placeholder="Task title"
              />
              <div className="floating-buttons">
                <button
                  className="safe"
                  onClick={() => handleUpdateField("title", updatedTask.title)}
                >
                  &#10004;
                </button>
                <button className="danger" onClick={() => setUpdatedTask(task)}>
                  &#10005;
                </button>
              </div>
            </div>

            {/* Task status dropdown */}
            <select
              className={getStatusStyleClass(updatedTask.status)}
              value={updatedTask.status}
              onChange={(e) => handleUpdateField("status", e.target.value)}
            >
              <option
                value="To Do"
                className={getStatusStyleClass("To Do")}
              >
                Todo
              </option>
              <option
                value="In Progress"
                className={getStatusStyleClass("In Progress")}
              >
                In Progress
              </option>
              <option
                value="Done"
                className={getStatusStyleClass("Done")}
              >
                Done
              </option>
            </select>
          </div>

          {/* Task description textarea with floating tick and cross */}
          <div className="field-container">
            <textarea
              value={updatedTask.description}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, description: e.target.value })
              }
              placeholder="Task description"
            />
            <div className="floating-buttons">
              <button
                className="safe"
                onClick={() =>
                  handleUpdateField("description", updatedTask.description)
                }
              >
                &#10004;
              </button>
              <button className="danger" onClick={() => setUpdatedTask(task)}>
                &#10005;
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <h3>Comments</h3>
          <div className="comments-container">
            {updatedTask.comments && updatedTask.comments.length > 0 ? (
              updatedTask.comments.map((comment, index) => (
                <div key={index} className="comment-box">
                  {editingCommentIndex === index ? (
                    <div className="field-container">
                      <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                      />
                      <div className="floating-buttons">
                        <button
                          className="safe"
                          onClick={handleSaveEditedComment}
                        >
                          &#10004;
                        </button>
                        <button
                          className="danger"
                          onClick={handleCancelEditComment}
                        >
                          &#10005;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="comment-content">
                      <div>
                        <div>{comment}</div>
                      </div>
                      <div className="comment-icons">
                        <button
                          className="primary"
                          onClick={() => handleEditComment(index)}
                        >
                          &#9998;
                        </button>
                        <button
                          className="danger"
                          onClick={() => handleDeleteComment(index)}
                        >
                          &#128465;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Add new comment textarea with floating tick */}
          <div className="field-container">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <div className="floating-buttons">
              <button onClick={handleAddComment}>&#10004;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
