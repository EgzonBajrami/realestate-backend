const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const districtSchema = new mongoose.Schema({
    district:{
        type:String,
        required:true,
        unique:true,
    }

})
districtSchema.plugin(uniqueValidator);

const districtModel = new mongoose.model('district', districtSchema)

module.exports = districtModel;