const handleError = require("../helper/handleError");
const cloudinary = require("../config/cloudinary.config");
const Blog = require("../models/blog.model");
const { encode } = require("entities");
const Category = require("../models/category.model");

const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);

    // FIX: find category by ID or SLUG
    const categoryData = await Category.findById(data.category);
    if (!categoryData) {
      return next(handleError(404, "Invalid category"));
    }

    let featuredImage = '';

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { folder: 'pitamber-web-blog', resource_type: 'auto' }
      );
      featuredImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      author: data.author,
      category: categoryData._id,   // FIXED !!!
      title: data.title,
      slug: data.slug,
      featuredImage,
      blogContent: encode(data.blogContent),
    });

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog added successfully.",
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};
const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) {
      next(handleError(404, "blog not found"));
    }
    res.status(200).json({
      blog,
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid);

    // FIX: convert category properly
    const categoryData = await Category.findById(data.category);
    if (!categoryData) {
      return next(handleError(404, "Invalid category"));
    }

    blog.category = categoryData._id;  // FIXED
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);

    let featuredImage = blog.featuredImage;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { folder: 'pitamber-web-blog', resource_type: 'auto' }
      );
      featuredImage = uploadResult.secure_url;
    }

    blog.featuredImage = featuredImage;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

const showAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ created_at: -1 })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found.");
    }

    const categoryId = categoryData._id;
    const blog = await Blog.find({
      category: categoryId,
    })
    .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const blog = await Blog.find({
      title: { $regex: q, $options: "i" },
    })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });

  } catch (error) {
    next(handleError(500, error.message));
  }
};


module.exports = {
  addBlog,
  updateBlog,
  showAllBlog,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogByCategory,
  search
};
