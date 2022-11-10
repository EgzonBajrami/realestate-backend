const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
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
    price:{
        type:Number,
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
    yard:{
        type:String,
        required:true,
    },
    status:{
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
      
}, { timestamps: {createdAt:'createdAt',updatedAt:'updatedAt'} })
const propertyModel = mongoose.model('property', propertySchema);

module.exports = propertyModel;