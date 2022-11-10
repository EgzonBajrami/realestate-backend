const cityModel = require('../models/city.models')

module.exports = {
    addCity: async(params) =>{
        const {city} = params;
 
    
        const result = await cityModel.create({
            city
        })
        return result;
        
    },
    getCities: async() =>{
        const result = await cityModel.find();
        return result;
    }

}