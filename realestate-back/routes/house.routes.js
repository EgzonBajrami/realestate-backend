const express = require('express')
const router = express.Router();
const {jsonResponse} = require('../lib/helper')
const houseController = require('../controller/house.controller')
const {verifyToken} = require('../middlewares/auth.middleware')
const upload = require('../services/upload.service')
router.post('/', async(req,res)=>{
    try{
        const result = await houseController.add(req.body);
        res.json(jsonResponse(result));


    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/promotedHouse', async(req,res)=>{
    try{
        const result = await houseController.findPromoted();
        res.json(jsonResponse(result))
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/allHouses', async(req,res)=>{
    try{
        const result = await houseController.getAllHouses(req.decoded);
        res.json(jsonResponse(result))
        
    }catch(err){
        res.json(jsonResponse(err.message,false))
    }
})
router.post('/createHouse', verifyToken, async(req,res)=>{
    try{
        const result = await houseController.createHouse(req.decoded,req.body);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/add-image/:id/:index', upload.single('house-image'), async(req,res)=>{
    try{
        const result = await houseController.createImage(req.params.id,req.file,req.params.index);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/singleHouse/:id', async(req,res)=>{
    try{
        const result = await houseController.getSingleHouse(req.params);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/editHouse/:id', async(req,res)=>{
    try{
        const result = await houseController.editHouse(req.params.id,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/latest', async(req,res)=>{
    try{
        const result = await houseController.getLatest();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
module.exports = router;