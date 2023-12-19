const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Project = mongoose.model('Project');


router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.userId);
    } catch(err) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: "No user found with that id" };
      return next(error);
    }
    try {
      const projects = await Project.find({ author: user._id })
                                .populate("author", "_id username");
      return res.json(projects);
    }
    catch(err) {
      return res.json([]);
    }
})

router.post('/projects/:projectId', requireUser, async (req, res, next) => {
  try {
      const newProject = new Project({

        author: req.user.id,
        title: req.body.title,
        description: req.body.description,
        photoUrls: req.body.photoUrls,
        public: req.body.public
    });

    let project = await newProject.save();
    project = await project.populate('author', '_id username');
    return res.json(project);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
