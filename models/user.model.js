const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, // Corrected typo "require" -> "required"
            unique: true,
            trim: true, // Removes leading and trailing spaces
            minlength: 3, // Minimum length for usernames
            maxlength: 50, // Maximum length for usernames
        },
        email: {
            type: String,
            required: true, // Corrected typo "require" -> "required"
            unique: true,
            trim: true, // Removes extra spaces
            lowercase: true, // Ensures all emails are stored in lowercase
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address", // Email validation regex
            ],
        },
        password: {
            type: String,
            required: true, // Corrected typo "require" -> "required"
            minlength: 8, // Enforces a minimum password length
        },
        role: {
            type: String,
            default: "user", // Default role is "user"
            enum: ["user", "admin"], // Restrict roles to "user" or "admin"
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
