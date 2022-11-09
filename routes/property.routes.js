const express = require('express')
const router = express.Router();
const {jsonResponse} = require('../lib/helper')

const upload = require('../services/upload.service')
const {verifyToken} = require('../middlewares/auth.middleware');
const propertyController = require('../controller/property.controller');

router.post('/createProperty', verifyToken, async(req,res)=>{
    try{
        const result = await propertyController.createProperty(req.decoded,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false))
    }
    
})
router.post('/add-image/:id/:index', upload.single('property-image'), async(req,res)=>{
    try{
        const result = await propertyController.createImage(req.params.id,req.file,req.params.index);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/promotedProperty', async(req,res)=>{
    try{
        const result = await propertyController.getPromoted();
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/allProperty', async(req,res)=>{
    try{
        const result = await propertyController.getAllProperties();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/singleProperty/:id', async(req,res)=>{
    try{
        const result = await propertyController.getSingleProperty(req.params);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false))
    }
})
router.post('/editProperty/:id', async(req,res)=>{
    try{
        const result = await propertyController.editProperty(req.params.id,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/latest', async(req,res)=>{
    try{
        const result = await propertyController.getLatest();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
module.exports = router;