// middlewares/validation.js

export const validateTask = (req, res, next) => {
    const errors = [];
    const { title, description } = req.body;

    // Validate title
    if (!title || typeof title !== "string" || title.trim().length < 3 || title.trim().length > 100) {
        errors.push("Title is required and must be between 3 and 100 characters.");
    }

    // Validate description (optional but max 500 characters)
    if (description && (typeof description !== "string" || description.length > 500)) {
        errors.push("Description must not exceed 500 characters.");
    }

    // If there are errors, pass them to the next middleware
    if (errors.length > 0) {
        req.validationErrors = errors;
    }

    next(); // Proceed if validation passes
};