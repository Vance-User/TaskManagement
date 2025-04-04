import express from 'express';
import path from "path";
import router from './routes/taskRoutes.js';

const app = express();

// Make sure this middleware comes before any routes
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

app.use('/', router);

app.use((req, res) => {
    res.status(404).send("Error");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
