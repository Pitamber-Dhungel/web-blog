const express=require('express');
const { addBlog, updateBlog, deleteBlog, editBlog, showAllBlog, getBlog, getBlogByCategory, search } = require('../controller/blog.controller');
const upload = require('../config/multer.config');

const BlogRoute=express.Router();

BlogRoute.post('/add',upload.single('file'),addBlog)
BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
BlogRoute.delete('/delete/:blogid',deleteBlog)
BlogRoute.get('/edit/:blogid',editBlog)
BlogRoute.get('/get-all',showAllBlog)
BlogRoute.get('/get-blog/:slug',getBlog)
BlogRoute.get('/get-blog-by-category/:category',getBlogByCategory)
BlogRoute.get('/search',search)



module.exports=BlogRoute;