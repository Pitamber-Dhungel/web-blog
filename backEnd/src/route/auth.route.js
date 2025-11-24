const express=require('express');
const {Register, Login, GoogleLogin, Logout}=require('../controller/auth.controller')

const AuthRoute=express.Router();

AuthRoute.post('/register',Register)
AuthRoute.post('/login',Login)
AuthRoute.post('/google-login',GoogleLogin)
AuthRoute.get('/logout',Logout)

module.exports=AuthRoute;
