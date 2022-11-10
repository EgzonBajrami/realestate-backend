const express = require('express')
const router = express.Router();
const {jsonResponse} = require('../lib/helper')
const apartmentController = require('../controller/apartment.controller')
const upload = require('../services/upload.service')
const {verifyToken} = require('../middlewares/auth.middleware')
router.post('/',async(req,res)=>{
    try{
        const result = await apartmentController.add(req.body);
        res.json(jsonResponse(result));
    

    }catch(err){
        res.json(jsonResponse(err.message,false))
    }

})
router.get('/apartment', async(req,res)=>{
    try{
        const result = await apartmentController.findApartment(req.body);
        res.json(jsonResponse(result))
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/allApart/:items', async(req,res)=>{
    try{
       
        const result = await apartmentController.getAllApartments(req.params);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/promotedApartment', async(req,res)=>{
    try{
        const result = await apartmentController.findPromoted();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false))
    }
})
router.post('/add-image/:id/:index', upload.single('apartment-image'), async(req,res)=>{
    try{
        console.log(req.file);
        const result = await apartmentController.createImage(req.params.id,req.file,req.params.index);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/createApartment', verifyToken, async(req,res)=>{
    try{
        const result = await apartmentController.createApartment(req.decoded,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
    
})
router.get('/singleApartment/:id', async(req,res)=>{
    try{
        const result = await apartmentController.getSingleApartment(req.params,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/edit/:id',verifyToken, async(req,res)=>{
    try{ console.log(req.body)
        const result = await apartmentController.editApartment(req.decoded,req.params,req.body);
       
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/latest', async(req,res)=>{
    try{
        const result = await apartmentController.getLatest();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})

module.exports = router;