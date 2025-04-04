// models/models.js
import { query } from "../config/db.js"; 

// ✅ GET ALL TASKS
export const getAllTasks = async () => {
  try {
    const result = await query("SELECT * FROM tasks ORDER BY created_at DESC");
    return result.rows;
  } catch (err) {
    console.error("Error in getAllTasks:", err);
    throw err;
  }
};

// ✅ ADD A NEW TASK
export const addTask = async (title, description) => {
  try {
    return await query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
  } catch (err) {
    console.error("Error in addTask:", err);
    throw err;
  }
};

// ✅ TOGGLE TASK STATUS
export const toggleTaskStatus = async (taskId) => {
  try {
    return await query(
      "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
      [taskId]
    );
  } catch (err) {
    console.error("Error in toggleTaskStatus:", err);
    throw err;
  }
};

// ✅ UPDATE TASK DETAILS
export const updateTask = async (taskId, title, description, priority) => {
  try {
    return await query(
      "UPDATE tasks SET title = $1, description = $2, priority = $3 WHERE id = $4 RETURNING *",
      [title, description, priority, taskId]
    );
  } catch (err) {
    console.error("Error in updateTask:", err);
    throw err;
  }
};

// ✅ DELETE A TASK
export const deleteTask = async (taskId) => {
  try {
    return await query("DELETE FROM tasks WHERE id = $1 RETURNING *", [taskId]);
  } catch (err) {
    console.error("Error in deleteTask:", err);
    throw err;
  }
};
