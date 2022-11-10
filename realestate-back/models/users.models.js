const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email: { 
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true, 
        trim: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },

    age:{type:Number, min:18},
    password:{type:String, required:true},
    role:{type:String, required:true}   
    
},{
    timestamps:true,
})
const userModel = mongoose.model('users',userSchema);
module.exports = userModel;
