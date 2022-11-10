const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const citySchema = new mongoose.Schema({
    city:{
        type:String,
        required:true,
        unique:true,
     
    }

})
citySchema.plugin(uniqueValidator);
const cityModel = new mongoose.model('city', citySchema)

module.exports = cityModel;