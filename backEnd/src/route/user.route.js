const express=require('express');
const { getUser,updateUser } = require('../controller/user.controller');
const upload = require('../config/multer.config');


const UserRoute=express.Router();

UserRoute.get('/get-user/:userid',getUser)
UserRoute.put('/update-user/:userid',upload.single('file'),updateUser)

module.exports=UserRoute;