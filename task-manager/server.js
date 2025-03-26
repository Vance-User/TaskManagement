const { Pool } = require("pg");

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: "postgres",  // Default PostgreSQL username
    host: "localhost", // Database server (or use the container name if using Docker)
    database: "taskdb", // Change to your actual database name
    password: "school", // Your PostgreSQL password
    port: 5432,        // Default PostgreSQL port
});

// Test database connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL Database"))
    .catch(err => console.error("❌ Database Connection Error:", err));


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
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
        res.render("index", { tasks: result.rows });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Server Error");
    }
});


app.post("/toggle-task/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        await pool.query(
            "UPDATE tasks SET completed = NOT completed WHERE id = $1",
            [taskId]
        );

        res.redirect("/");
    } catch (error) {
        console.error("Error toggling task:", error);
        res.status(500).send("Server Error");
    }
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
app.post("/delete-task/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Server Error");
    }
});


// ✅ Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
});
