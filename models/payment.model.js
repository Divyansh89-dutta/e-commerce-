const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    signature:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['success', 'pending', 'failed'],
        required:true
    }
},{
    timestamps:true
})
const payment = mongoose.model('Payment',paymentSchema);

module.exports = payment;