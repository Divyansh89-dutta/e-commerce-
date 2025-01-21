const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    products:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    buyer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seller:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    payment:{
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true,
    }
},{
    timestamps: true,
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;