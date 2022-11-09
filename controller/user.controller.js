const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../models/users.models');
const bcrypt = require('bcrypt');

module.exports = {
    add: async(params) =>{
        console.log(params);
        const {password,firstName,lastName,age,email} = params

        const hashedPassword = await bcrypt.hash(params[4], parseInt(process.env.SALT));

        const result = await userModel.create({password:hashedPassword,firstName:params[2],lastName:params[1],age:params[3],email:params[0],role:'ADMIN'});
        console.log(result);
        return result._id;
    }
}