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
    try {
            const newComment = new Comment({
                author: req.body.authorId,
                project: req.body.projectId,
                body: req.body.body
            });
  
      let comment = await newComment.save();
    // comment = await comment.populate('author', '_id username');
      return res.json(comment);
    }
    catch(err) {
      next(err);
    }
});

module.exports = router;
