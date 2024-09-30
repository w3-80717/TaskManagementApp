# Task Management Board

## Overview

This project is a **Task Management Board** built with **React.js**. The app features:

- **Kanban-style swim lanes** for tasks, categorized as `Todo`, `In Progress`, and `Done`.
- A **task modal** where users can edit task details such as the title, description, and comments.
- A **status dropdown** to update the status of each task.
- **Drag-and-drop functionality** to move tasks between swim lanes.

The application allows you to manage tasks visually, providing an easy-to-use interface for organizing and tracking progress.

## Features

- **Task Modals**: Each task opens a modal window that allows users to:
  - Edit the title and description of the task.
  - Add, edit, or delete comments.
  - Change the status (Todo, In Progress, Done) using a dropdown.
  
- **Drag-and-Drop**: Tasks can be moved between lanes using a drag-and-drop interface, allowing users to easily update the task status.

- **Dynamic Status Color Coding**:
  - Todo tasks are highlighted in **gray**.
  - In Progress tasks are highlighted in **blue**.
  - Done tasks are highlighted in **green**.

## Screenshots
*(Include screenshots of the app here)*

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: You can download it from [here](https://nodejs.org/).
- **npm**: It is included with Node.js, but you can also check the installation guide [here](https://www.npmjs.com/get-npm).

### Installing

Follow these steps to clone the project and set it up locally:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/task-management-board.git
    cd task-management-board
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

    This will install all required packages listed in the `package.json` file, including **React**, **react-dnd**, and other libraries.

### Running the Application

1. **Start the development server**:

    ```bash
    npm start
    ```

    The app should now be running on `http://localhost:3000/`. Open this URL in your browser to view the Task Management Board.

### Building for Production

To build the app for production (with optimized code):

```bash
npm run build
