const mongoose = require('mongoose');
const { Schema } = mongoose; // Corrected capitalization

// Define the schema for blacklisted tokens
const blacklistedSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true, // Ensure tokens are unique
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Add an index to ensure uniqueness for the token
blacklistedSchema.index({ token: 1 }, { unique: true });

// Create or retrieve the model
const Blacklisted = mongoose.model('Blacklisted', blacklistedSchema); // Corrected model creation syntax

module.exports = Blacklisted;
