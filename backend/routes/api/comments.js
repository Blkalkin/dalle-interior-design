const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
})

module.exports = router;
