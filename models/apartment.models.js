const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
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
    rooms:{
        type:Number,
        min:1,
        required:true,
    },
    toilet:{
        type:Number,
        min:1,
        required:true,
    },
    price:{
        type:Number,
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
          
        }
    ],
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
},
{timestamps: {createdAt:'createdAt',updatedAt:'updatedAt'}})

const apartmentModel = mongoose.model('apartment', apartmentSchema);
module.exports = apartmentModel;