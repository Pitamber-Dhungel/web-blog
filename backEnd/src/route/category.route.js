const express=require('express');
const { addCategory, updateCategory, showCategory, deleteCategory, getAllCategory } = require('../controller/category.controller');


const CategoryRoute=express.Router();

CategoryRoute.post('/add',addCategory)
CategoryRoute.put('/update/:categoryid',updateCategory)
CategoryRoute.get('/show/:categoryid',showCategory)
CategoryRoute.delete('/delete/:categoryid',deleteCategory)
CategoryRoute.get('/all-category',getAllCategory)

module.exports=CategoryRoute;