const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Project = mongoose.model('Project');


router.get('/project/:projectId', async (req, res, next) => {
    let project;

    try {
      project = await Project.findById(req.params.projectId);
    } catch(err) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      error.errors = { message: "No project found with that id" };
      return next(error);
    }
    try {
      const comments = await Comment.find({ project: project._id })
                                .populate("author", "_id username")
                                .sort({ createdAt: "desc"});
      return res.json(comments);
    }
    catch(err) {
      return res.json([]);
    }
});

router.post('/', async (req, res, next) => {

      const newComment = new Comment({
          body: req.body.body
      });
      try {
        newComment.author = await User.findById(req.body.authorId);
      }catch{
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
      }
      try{
        newComment.project = await Project.findById(req.body.projectId);
      }catch{
        const error = new Error('Project not found');
        error.statusCode = 404;
        error.errors = { message: "No project found with that id" };
        return next(error);
      }
      try{
        let comment = await newComment.save();
        comment = await comment.populate("author", "_id username");
        comment = await comment.populate("project", '_id');

        return res.json(comment);
      }catch{}
          const error = new Error('Comment failed to save');
          error.statusCode = 422;
          return next(error);
      }
);

router.patch('/:commentId/edit', async (req, res, next) => {
  let comment;

  try{
    comment = await Comment.findById(req.params.commentId);
  }catch(err) {
    const error = new Error('Comment not found');
    error.statusCode = 404;
    error.errors = { message: "No comment found with that id" };
    return next(error);
  }try {

    comment.body = req.body.body || comment.body.body;
    let editedComment = await comment.save();
    editedComment = await comment.populate('author', '_id');
    return res.json(editedComment);
  }catch(err) {
    if (err.name === 'ValidationError') {
      // Mongoose validation error
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.errors = validationErrors;
      return next(error);
    }
    // Handle other Mongoose errors
    const error = new Error('Comment failed to save');
    error.statusCode = 500; // Internal Server Error
    return next(error);
  }
})

router.delete('/:commentId', async (req, res, next) => {

  try {
    let comment = await Comment.deleteOne({ _id: req.params.commentId});

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      throw error;
    }

  
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
