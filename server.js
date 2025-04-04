// Filename: server.js
/*import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import router from "./routes/taskRoutes.js"

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add JSON parsing middleware

// Serve static files from public directory
app.use(express.static(path.join(process.cwd(), "public")));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Custom logging middleware
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
app.use(loggingMiddleware);

app.use(express.json());

// Routes middleware
app.use("/", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { 
    message: "404 Not Found",
    error: {}
  });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task Manager running at http://localhost:${PORT}/`);
});*/
