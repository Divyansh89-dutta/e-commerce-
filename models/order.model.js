const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the order schema
const orderSchema = new Schema(
    {
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true, // Ensure each product reference is required
            },
        ],
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        payment: {
            type: Schema.Types.ObjectId,
            ref: 'Payment',
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
