// controllers/controller.js
import {
  getAllTasks,
  addTask,
  toggleTaskStatus,
  updateTask,
  deleteTask
} from "../models/models.js";

// ✅ GET / - Home Page (Retrieve all tasks)
export const getHome = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.render("index", {
      tasks,
      success: req.query.success,
      error: req.query.error,
      errors: req.validationErrors || [] // Pass validation errors
    });
  } catch (err) {
    console.error("Error in getHome:", err);
    res.status(500).send("Failed to load tasks");
  }
};

// POST /add-task - Add a New Task
export const createTask = async (req, res) => {
    const { title, description, priority } = req.body;
    
    // If validation errors exist, re-render the form with errors
    if (req.validationErrors) {
        return res.render("index", { tasks: await getAllTasks(), errors: req.validationErrors });
    }
    
    try {
        await addTask(title.trim(), description?.trim() || "", priority);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Server error");
    }
};

// POST /toggle-task/:id - Toggle Task Completion Status
export const toggleTask = async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    await toggleTaskStatus(taskId);
    res.redirect("/?success=Task status updated");
  } catch (err) {
    console.error("Error in toggleTask:", err);
    res.redirect("/?error=Failed to update task status");
  }
};

//  PUT /update-task/:id - Update Task Details
export const updateTaskDetails = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, priority } = req.body;
    
    // If validation errors exist, re-render the form with errors
    if (req.validationErrors) {
        return res.render("index", { tasks: await getAllTasks(), errors: req.validationErrors });
    }
    
    try {
        const result = await updateTask(taskId, title, description, priority);
        
        if (result.rowCount === 0) {
            return res.redirect("/?error=Task not found");
        }
        
        res.redirect("/?success=Task updated successfully");
    } catch (err) {
        console.error("Error in updateTaskDetails:", err);
        res.redirect("/?error=Failed to update task");
    }
};

//POST /delete-task/:id - Delete a Task
export const deleteTaskController = async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    const result = await deleteTask(taskId);

    if (result.rowCount === 0) {
      return res.redirect("/?error=Task not found");
    }

    res.redirect("/?success=Task deleted successfully");
  } catch (err) {
    console.error("Error in deleteTaskController:", err);
    res.redirect("/?error=Failed to delete task");
  }
};