const userModel = require('../models/users.models')
const propertyModel = require('../models/property.models')

module.exports = {
    createProperty: async(decoded,params)=>{
        const user = decoded;
        console.log(decoded);
        const userId = await userModel.findById(user);
        if(!userId){
            return "No user exists by that ID!"
        }
        const {city,district,title,price,description,yard,status,promoted,latitude,longitute} = params;

       console.log(params);
    

        const property = await propertyModel.create({
            author:userId._id,
            city,
            district,
            title,
            price,
            description,
            yard,
            status:status,
           
          
           promoted,
           latitude,
           longitute



        })

        await propertyModel.populate(property,{path:"author", select:"-password"})
        return property;

      
    },  
    createImage:async(id,file,index)=>{
        let fileName=null;
        console.log(index);
      
        if(file){
            fileName=`/images/${file.filename}`
        }
        const result = await propertyModel.findById(id)
        const currentImages = result.images;
       
        console.log(currentImages[index]);
        if(currentImages[index]==""){
            
            currentImages.push(fileName)

        }else{
                        currentImages.splice(index,1,fileName);
                        console.log(currentImages)
        }

     
        const updated = await propertyModel.findByIdAndUpdate(id,{images:currentImages}).exec();

        return updated;
    },
    getPromoted: async()=>{
        const result = await propertyModel.find({promoted:"Po"}).limit(2).sort('-createdAt');
        return result;
    },
    getAllProperties: async()=>{
        const result = await propertyModel.find();
        return result;
    },
    getSingleProperty: async(params)=>{
        const result = await propertyModel.findById(params.id);
        return result
    },
    editProperty: async(params,body)=>{
        const {city,district,title,price,description,yard,status,promoted,latitude,longitute} = body;
        const result = await propertyModel.findByIdAndUpdate(params,{
            city,
            district,
            title,
            price,
            description,
            yard,
            status:status,
           
          
           promoted,
           latitude,
           longitute

        })
        if(!result){
            return "No property exists by that ID."
        }
        return result;

    },
    getLatest: async() =>{
        const result = await propertyModel.find().sort("-createdAt").limit(1);
        return result;
    }
}