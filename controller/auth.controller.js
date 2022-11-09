const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users.models')

module.exports = {
    login: async(params) =>{
        console.log(params);
    
        const user = await userModel.findOne({email:params[0]});
        console.log(user);
        if(!user){
            throw Error('User does not exist')
        }
        if(!(await bcrypt.compare(params[1],user.password))){
            throw Error('Password is incorrect');
        }
        
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        return {
            token,
            role:user.role
        }

    },
 
}