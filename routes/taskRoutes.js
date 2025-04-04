// routes/taskRoutes.js
import express from "express";
import {
    getHome,
    createTask,
    toggleTask,
    updateTaskDetails,
    deleteTaskController
} from "../controllers/controller.js";

import { validateTask } from "../middlewares/validation.js"; // Import validation middleware

const router = express.Router();

router.get("/", getHome);
router.post("/add-task", validateTask, createTask);
router.post("/toggle-task/:id", toggleTask);
router.put("/update-task/:id", validateTask, updateTaskDetails);
router.post("/delete-task/:id", deleteTaskController);

export default router;
