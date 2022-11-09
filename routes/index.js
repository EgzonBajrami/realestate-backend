var express = require('express');
var router = express.Router();

const userController = require('../controller/user.controller')
const {jsonResponse} = require('../lib/helper')
const fieldMiddleware = require('../middlewares/field.middleware')
const authController = require('../controller/auth.controller')
const queryController = require('../controller/query.controller')
const cityController = require('../controller/city.controller')
const districtController = require('../controller/district.controller')



/* GET home page. */
router.get("/", (req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
 });
router.post('/register', async(req,res)=>{
  try{
    console.log(req.body)
    const result = await userController.add(req.body);
  
    res.json(jsonResponse(result));

  }catch(err){
    res.status(400).json(jsonResponse(err.message,false));
  }
})
router.post('/login', async(req,res)=>{
  try{
    const result = await authController.login(req.body);
    res.json(jsonResponse(result));
  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
router.post('/query', async(req,res)=>{
  try{
    const result = await queryController.getPosts(req.body);
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));

  }
})
router.post('/addCity', async(req,res)=>{
  try{
    const result = await cityController.addCity(req.body);
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
router.get('/cities', async(req,res)=>{
  try{
    const result = await cityController.getCities();
    res.json(jsonResponse(result));
    
  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
router.post('/addDistrict', async(req,res)=>{
  try{
    const result = await districtController.addDistrict(req.body);
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
router.get('/districts', async(req,res)=>{
  try{
    const result = await districtController.getDistricts();
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
module.exports = router;
