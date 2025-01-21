const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the payment schema
const paymentSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order', // Reference to the Order model
            required: true,
        },
        paymentId: {
            type: String,
            required: true,
            unique: true, // Ensure each payment ID is unique
        },
        signature: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0, // Ensure the amount is non-negative
        },
        currency: {
            type: String,
            required: true,
            default: 'INR', // Default to a commonly used currency
            enum: ['INR', 'USD', 'EUR', 'GBP', 'JPY'], // Restrict to specific currencies
        },
        status: {
            type: String,
            enum: ['success', 'pending', 'failed'],
            required: true,
            default: 'pending', // Default status is 'pending'
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
