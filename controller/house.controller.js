const houseModel = require('../models/house.models');
const userModel = require('../models/users.models');

module.exports = {
    add: async(params)=>{
       
        const decoded = params.autori;
        const {city,district,floors,rooms,toilet,price,stat,title,description,images,yard,promoted,latitude,longitute} = params;

        const user = await userModel.findById(decoded);
        console.log(params);
        if(!user){
            return "No user exists by that ID"
        }
    

        const house = await houseModel.create({
            author:user._id,
            city,
            district,
            floors,
            rooms,
            bathroom:toilet,
            price,
            stat,
            title,
            description,
           images,
           yard,
           promoted,
           latitude,
           longitute,



        });
        console.log(house);

        await houseModel.populate(house,{path:"author", select:"-password"})
        return house;

    },
    findPromoted: async() =>{

        const result = await houseModel.find({promoted:'Po'}).limit(2).sort('-createdAt');
        console.log(result);
        return result;
    },
    getAllHouses: async () =>{
        const result = await houseModel.find();
        console.log(result);
        return result;
    },
    createHouse: async(decoded,params)=>{
        const userId = decoded;
        console.log(decoded)
        console.log(params.images);
       
        const {city,district,floor,room,toilet,price,status,title,description,yard,images,promoted,latitude,longitute} = params;
        console.log(params);
        const user = await userModel.findById(userId);
        if(!user){
            return "No user exists by that ID"
        }
    

        const apartment = await houseModel.create({
            author:user._id,
            city,
            district,
            floors:floor,
            rooms:room,
            bathroom:toilet,
            price,
            status,
            title,
            description,
           images,
           yard,
           promoted,
           latitude,
           longitute



        })

        await houseModel.populate(apartment,{path:"author", select:"-password"})
        return apartment;

    },
    createImage:async(id,file,index)=>{
        let fileName=null;
        console.log(index);
      
        if(file){
            fileName=`/images/${file.filename}`
        }
        const result = await houseModel.findById(id)
        const currentImages = result.images;
       
        console.log(currentImages[index]);
        if(currentImages[index]==""){
            
            currentImages.push(fileName)

        }else{
                        currentImages.splice(index,1,fileName);
                        console.log(currentImages)
        }

     
        const updated = await houseModel.findByIdAndUpdate(id,{images:currentImages}).exec();

        return updated;
    },
    getSingleHouse: async(params)=>{

    
        const result = await houseModel.findById(params.id);
        if(!result){
            return "No house exists by that ID."
        }
        return result;
    },
    editHouse: async(params, body)=>{
        const {city,district,floor,room,toilet,price,status,title,description,yard,images,promoted,latitude,longitute} = body;
        const result = await houseModel.findByIdAndUpdate(params,{
          
            city,
            district,
            floors:floor,
            rooms:room,
            bathroom:toilet,
            price,
            status,
            title,
            description,
         
           yard,
           promoted,
           latitude,
           longitute

        });
        if(!result){
            return "No house exists by that ID."
        }
        console.log(result);
        return result;
    },
    getLatest: async() =>{
        const result = await houseModel.find().sort("-createdAt").limit(1);
        return result;
    }
}