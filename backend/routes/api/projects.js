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

router.get("/", async (req, res) => {
   try {
      const projects = await Project.find()
                                    .populate("author", "_id username")
      return res.json(projects)
   }
   catch(err) {
    return res.json([])
   }
})

router.post('/', async (req, res, next) => {
  
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    photoUrls: req.body.photoUrls,
    public: req.body.public
  });

  try{
    newProject.author = await User.findById(req.body.authorId);
  }catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }try {
    let project = await newProject.save();
    project = await project.populate('author', '_id');
    return res.json(project);
  }catch(err) {
    const error = new Error('Project failed to save');
    error.statusCode = 422;
    return next(error);
  }
})

module.exports = router;
