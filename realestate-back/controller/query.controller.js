const houseModel = require('../models/house.models')
const apartmentModel = require('../models/apartment.models')
module.exports ={
    getPosts: async(params)=>{
        const{city,district,status,type,rooms,bahtrooms} = params;
        let result;
        if(type==='house'){
            result = await houseModel.find({city:city,district:district,status:status,rooms:rooms,bahtrooms:bathrooms})

        }
        if(type==='apartment'){
            result = await apartmentModel.find({city:city,district:district,status:status,rooms:rooms,bahtrooms:bathrooms})


        }
       
       

    }
}