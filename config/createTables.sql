DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,          -- Auto-incrementing primary key
    title VARCHAR(100) NOT NULL,    -- Task title, required, max 100 chars
    description TEXT,               -- Optional task description (max 500 enforced in code)
    priority INT DEFAULT 1,         -- Task priority (defaulting to 1)
    completed BOOLEAN DEFAULT FALSE, -- Task completion status (defaulting to false)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


/*
export const getHome = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.render("index", {
      tasks,
      success: req.query.success,
      error: req.query.error
    });
  } catch (err) {
    console.error("Error in getHome:", err);
    res.status(500).render("error", {
      message: "Failed to load tasks",
      error: process.env.NODE_ENV === "development" ? err : {}
    });
  }
};

// POST /add-task - Add a New Task
export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  
  // Use validation function
  const errors = validateTask(title, description, priority);

  if (errors.length > 0) {
      const tasks = await getAllTasks();
      return res.render("index", { tasks, error: errors.join("<br>") });
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

  if (!title || title.length < 3 || title.length > 100) {
    return res.redirect(`/?error=Title must be between 3 and 100 characters`);
  }

  if (description && description.length > 500) {
    return res.redirect(`/?error=Description cannot exceed 500 characters`);
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

*/