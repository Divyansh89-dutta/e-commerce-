const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userShema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    }
},{
    timestamps:true
})
const User = mongoose.model('User', userShema);

module.exports = User;