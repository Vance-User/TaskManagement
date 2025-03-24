const express = require("express");         // imports the Express framework
const bodyParser = require("body-parser");  //imports body-parser, a middleware that helps parse incoming request bodies.

const app = express(); //app variable represents your Express server
const port = 3000;  //sets the port number





// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Temporary in-memory storage for tasks stored in an array 
let tasks = [];

// ✅ GET / - Display the main page with tasks list and add form
app.get("/", (req, res) => {                                        //Displays the task list
    res.render("index", { tasks });                                 //res.render("index", { tasks })
});

                                                                    /*This handles requests to the root (/) URL.
                                                                    res.render("index", { tasks }):
                                                                    It renders the index.ejs file (a template file).
                                                                    The { tasks } object is passed to index.ejs, so the template can dynamically display all tasks.*/

app.post("/add-task", (req, res) => {                             //This route handles form submissions when users add a new task.
                                                                 //req.body contains form data from the POST request.
    const { title, description, priority } = req.body;          //Extracts title, description, and priority from the form submission.
    const newTask = {
        id: tasks.length + 1,                                  // Simple unique ID
        title,                                                //Task title from the form.
        description,                                         //Task description from the form.
        completed: false,                                   //Tasks start as not completed.
        priority: priority || 'normal'                     // Default to 'normal' if no priority is selected
    };
    tasks.push(newTask);                                    //Adds the new task to the tasks array (stored in memory).
    res.redirect("/");                                     // After adding the task, it redirects the user back to the homepage (/) so they can see the updated task list.
});


// ✅ POST /toggle-task/:id - Toggle task completed status
app.post("/toggle-task/:id", (req, res) => {                    //Defines a POST request for /toggle-task/:id.
                                                               //:id is a route parameter that represents the ID of the task.
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed; // Toggle status
    }
    res.redirect("/");
});

// ✅ POST /delete-task/:id - Delete a task by ID
app.post("/delete-task/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    res.redirect("/");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); //This makes your server start listening for requests
});
