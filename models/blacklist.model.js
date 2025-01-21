const mongoose = require('mongoose');
const {schema} = mongoose;

const blacklistedSchema = new Schema({
    token:{
        type:String,
        required:true
    }
},
 {timestamps: true})

blacklistedSchema.index({token: 1}, {unique: true});

const blacklisted = mongoose.models("backlist", blacklistedSchema);

module.exports = blacklisted;