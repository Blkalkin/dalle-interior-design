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
                                .populate("author", "_id username");
      return res.json(comments);
    }
    catch(err) {
      return res.json([]);
    }
});

router.post('/projects', async (req, res, next) => {

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
        return res.json(comment);
      }catch{}
          const error = new Error('Comment failed to save');
          error.statusCode = 422;
          return next(error);
      }
);

module.exports = router;
