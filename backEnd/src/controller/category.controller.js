const Category = require("../models/category.model");
const handleError = require("../helper/handleError");

const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({
      name,
      slug,
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category added successfully.",
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};
const showCategory = async (req, res, next) => {
  try {
    const {categoryid}=req.params
    const category=await Category.findById(categoryid)
    if(!category){
        next(handleError(404,'category not found'))
    }
    res.status(200).json({
        category
    })
  } catch (err) {
    next(handleError(500, err.message));
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const {categoryid}=req.params
    const category=await Category.findByIdAndUpdate(categoryid,{name,slug},{new:true})
    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const {categoryid}=req.params
    const category=await Category.findByIdAndDelete(categoryid)
    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};
const getAllCategory = async (req, res, next) => {
  try {
    const category=await Category.find().sort({name:1}).lean().exec()
    res.status(200).json({
        category
    })
  } catch (err) {
    next(handleError(500, err.message));
  }
};

module.exports = { addCategory, updateCategory, showCategory, deleteCategory,getAllCategory };
