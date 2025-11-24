const express=require('express');
const { addComment, getComments } = require('../controller/Comment.controller');


const CommentRoute=express.Router();

CommentRoute.post('/add',addComment)
CommentRoute.get('/get/:blogid',getComments)


module.exports=CommentRoute;