
const apartmentModel = require('../models/apartment.models');
const userModel = require('../models/users.models');

module.exports = {
    add: async(params)=>{
        console.log(params.images);
        const decoded = params.autori;
        const {city,district,rooms,toilet,price,stat,title,description,images,promoted} = params;

        const user = await userModel.findById(decoded);
        if(!user){
            return "No user exists by that ID"
        }
    

        const apartment = await apartmentModel.create({
            author:user._id,
            city,
            district,
            rooms,
            toilet,
            price,
            stat,
            title,
            description,
           images,
           promoted,
           



        })

        await apartmentModel.populate(apartment,{path:"author", select:"-password"})
        return apartment;

    },
    findApartment: async(params) =>{
        
        const result = await apartmentModel.find({city:city,district:district,rooms:rooms,toilet:toilet,stat:stat}).sort("-createdAt")
        return result;
    },
    getAllApartments: async(params)=>{
        console.log(params.items);
        const data = params.items.split(',');
        console.log(data[0]);
        let updatedData = [];
       
       if(!data[0]&&!data[1]&&!data[2]){

           const result = await apartmentModel.find({
   
           
               rooms:{$gt:data[4]},
               toilet:{$gt:data[5]},
              
   
            }).sort("-createdAt")
           return result;
       }
       if(!data[0]&&!data[1]){
        const result = await apartmentModel.find({
   
           
            rooms:{$gt:data[4]},
            toilet:{$gt:data[5]},
            status:{$in:[data[2]]}
           

        }).sort("-createdAt")
        return result;

       }
       if(!data[0]&&!data[2]){
        const result = await apartmentModel.find({
   
            district:{$in:[data[1]]},
            rooms:{$gt:data[4]},
            toilet:{$gt:data[5]},
          
           

        }).sort("-createdAt")
        return result;

       }
       if(!data[1]&&!data[2]){
        const result = await apartmentModel.find({
   
            city:{$in:[data[0]]},
            rooms:{$gt:data[4]},
            toilet:{$gt:data[5]},
          
           

        }).sort("-createdAt")
        return result;

       }
       if(!data[0]){
        const result = await apartmentModel.find({
   
            district:{$in:[data[1]]},
            rooms:{$gt:data[4]},
            toilet:{$gt:data[5]},
            status:{$in:[data[2]]}
           

        }).sort("-createdAt")
        return result;
        
       }
       if(!data[2]){
        const result = await apartmentModel.find({
            city:{$in:data[0]},
            district:{$in:[data[1]]},
            rooms:{$gt:data[4]},
            toilet:{$gt:data[5]},
           
           

        }).sort("-createdAt")
        return result;

       }

       const result = await apartmentModel.find({
         city:{$in:data[0]},
        district:{$in:[data[1]]},
        rooms:{$gt:data[4]},
        toilet:{$gt:data[5]},
        status:{$in:[data[2]]}
       

    }).sort("-createdAt")
       
        console.log(result);
        return result;
       
      
    
    },
    findPromoted:async() =>{

        const result = await apartmentModel.find({promoted:"Po"}).limit(2).sort('-createdAt')
        return result;
    },
    createImage:async(id,file,index)=>{
        let fileName=null;
        console.log(index);
      
        if(file){
            fileName=`/images/${file.filename}`
        }
        const result = await apartmentModel.findById(id)
        const currentImages = result.images;
       
        console.log(currentImages[index]);
        if(currentImages[index]==""){
            
            currentImages.push(fileName)

        }else{
                        currentImages.splice(index,1,fileName);
                        console.log(currentImages)
        }

     
        const updated = await apartmentModel.findByIdAndUpdate(id,{images:currentImages}).exec();

        return updated;
    },
    createApartment:async(decoded,params)=>{
        const user = decoded;
        console.log(params);
        const userId = await userModel.findById(user);
        if(!userId){
            return "No user exists by that ID!"
        }
        const {city,district,toilet,price,stat,title,description,promoted,latitude,longitute} = params;

       console.log(params);
    

        const apartment = await apartmentModel.create({
            author:userId._id,
            city,
            district,
            rooms:params.room,
            toilet,
            price,
            status:params.status,
            title,
            description,
          
           promoted,
           latitude,
           longitute



        })

        await apartmentModel.populate(apartment,{path:"author", select:"-password"})
        return apartment;

    },
    getSingleApartment: async(params,body)=>{
        const result = await apartmentModel.findById(params.id);
        if(!result){
            return "No apartment exists by that ID"
        }
        return result;
    },
    editApartment: async(decoded,params,body)=>{
        console.log(params);
        const apartmentId = await apartmentModel.findById(params.id);
        const {city,district,toilet,price,stat,title,description,promoted,latitude,longitute} = body;
        if(!apartmentId){
            return "No apartment exists by that ID."
        }
        const updatedApartment = await apartmentModel.findByIdAndUpdate(apartmentId,{
            city,
            district,
            rooms:body.room,
            toilet,
            price,
            status:body.status,
            title,
            description,
          
           promoted,
           latitude,
           longitute
        })
        return updatedApartment;
        
    },
    getLatest: async() =>{
        const result = await apartmentModel.find().sort("-createdAt").limit(1);
        return result;
    }
}