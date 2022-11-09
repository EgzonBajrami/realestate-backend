const districtModel = require('../models/district.models');

module.exports = {
    addDistrict: async(params)=>{
        const {district} = params;
        const result = await districtModel.create({
            district
        })
        return result;
    },
    getDistricts:async()=>{
        const result = await districtModel.find();
        return result;
    }
}