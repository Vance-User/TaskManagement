const express = require("express");         // Imports the Express framework
const bodyParser = require("body-parser");  // Imports body-parser to parse incoming request bodies

const app = express(); 
const port = 3000;  // Sets the port number

// ✅ Middleware - Configures Express to use necessary features
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.use(bodyParser.json()); // ✅ Supports JSON request bodies (important for PUT/PATCH)
app.use(express.static("public")); // Serves static files (CSS, images, etc.)
app.set("view engine", "ejs"); // Uses EJS templating engine

// ✅ In-Memory Storage for Tasks
let tasks = [];

// ✅ GET / - Display the main page with tasks list and add form
app.get("/", (req, res) => {                                        
    res.render("index", { tasks });  // Renders the index.ejs file with task data
});

// ✅ POST /add-task - Add a New Task
app.post("/add-task", (req, res) => {                             
    const { title, description, priority } = req.body;          
    const newTask = {
        id: tasks.length + 1,  // Generates a unique ID
        title,                
        description,          
        completed: false,     
        priority: priority || 'normal' // Default to 'normal' if no priority is selected
    };
    tasks.push(newTask);  // Adds the new task to the tasks array
    res.redirect("/");  // Refreshes the page to show the updated task list
});

// ✅ PATCH /toggle-task/:id - Toggle Completed Status
app.patch("/toggle-task/:id", (req, res) => { 
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed; // ✅ Toggle the task’s status
    }
    res.redirect("/");
});

// ✅ PUT /update-task/:id - Update Task Details
app.put("/update-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, priority } = req.body;
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        // ✅ Updates only provided fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (priority) task.priority = priority;
        return res.status(200).json({ message: "Task updated successfully", task });
    }
    res.status(404).json({ message: "Task not found" });
});

// ✅ DELETE /delete-task/:id - Remove a Task
app.delete("/delete-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(task => task.id !== taskId); // ✅ Removes task from array

    if (tasks.length < initialLength) {
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    res.status(404).json({ message: "Task not found" });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
});
