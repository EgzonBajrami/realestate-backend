const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    floors:{
        type:String,
        required:true,
    },

    rooms:{
        type:Number,
        required:true,
    },
    bathroom:{
        type:Number,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[
        {
            type:String,
            required:true,
        }
    ],
    yard:{
        type:Number,
        required:true,
    },
    promoted:{
        type:String,
        required:true,
    },
    latitude:{
        type:String,
       
        
    },
    longitute:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    

} , {timestamps: {createdAt:'createdAt',updatedAt:'updatedAt'}})
const houseModel = mongoose.model('houses',houseSchema);

module.exports = houseModel;