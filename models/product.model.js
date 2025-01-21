const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the product schema
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
            minlength: 3, // Minimum length validation
            maxlength: 100, // Maximum length validation
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10, // Minimum length validation
            maxlength: 1000, // Maximum length validation
        },
        price: {
            type: Number,
            required: true,
            min: 0, // Ensure price is non-negative
        },
        images: {
            type: [String], // Array of image URLs
            validate: {
                validator: (images) => images.length > 0, // Ensure at least one image
                message: 'At least one image is required.',
            },
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
