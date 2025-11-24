const handleError = require("../helper/handleError");
const Comment = require("../models/comment.model");

const addComment = async (req, res, next) => {
  try {
   const {author, blogid, comment}=req.body
   const newComment=new Comment({
    author:author,
    blogid:blogid,
    comment:comment
   })

   await newComment.save() 
   res.status(200).json({
      success: true,
      message: "Comment added successfully.",
      comment:newComment
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};


const getComments= async (req, res, next) => {
  try {
   const {blogid}=req.params
   const comments=(await Comment.find({blogid})).populate('author','name avatar').toSorted({createdAt:-1}).lean().exec()
   res.status(200).json({
      comments,
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

module.exports = { addComment, getComments};