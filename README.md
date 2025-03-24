# TaskManagement
Task Management Web App 
A simple Task Management Web App built with Node.js, Express, and EJS (Server-Side Rendering). This app allows users to:

✅ View a list of tasks
➕ Add new tasks
✔️ Mark tasks as complete
🗑 Delete tasks

📌 Features
Server-Side Rendering (SSR) using EJS
Local in-memory task storage (no database required)
Basic task management functions (add, complete, delete)
Express for handling routes
Body-parser for handling form submissions


Project structure
📂 task-manager
│── 📂 public
│   ├── styles.css        # CSS styling
│── 📂 views
│   ├── index.ejs         # EJS template for displaying tasks
│── server.js             # Main server file
│── package.json          # Project metadata & dependencies
│── README.md             # Documentation

GET /
Displays the task list.

POST /add-task
Adds a new task with title, description, and priority.

POST /toggle-task/:id
Toggles the task's completion status.

POST /delete-task/:id
Deletes a task.
