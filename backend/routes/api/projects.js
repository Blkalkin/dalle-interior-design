const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const multer =  require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { awsBucketName, awsBucketRegion, awsAccess, awsSecret } = require('../../config/keys');

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccess,
    secretAccessKey: awsSecret
  },
  region: awsBucketRegion
});


const storage = multer.memoryStorage()
const upload = multer({ storage: storage }) // upload function

upload.single('photo'); // 'photo' must match 'name' field in the html form image input



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



router.post('/photos', upload.single('photo'), async (req, res, next) => {
  // photo data will be in req.file. Buffer is the actual photo

  // req.file.buffer

  const params = {
    Bucket: awsBucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  }

  const command = new PutObjectCommand(params);

  await s3.send(command);
});




router.patch('/:id/edit', async (req, res, next) => {
  let project;

  try{
    project = await Project.findById(req.params.id);
  }catch(err) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    error.errors = { message: "No project found with that id" };
    return next(error);
  }try {
    project.title = req.body.title;
    project.description = req.body.description;
    project.photoUrls = req.body.photoUrls;
    project.public = req.body.public;

    let editedProject = await project.save();
    editedProject = await project.populate('author', '_id');
    return res.json(editedProject);
  }catch(err) {
    const error = new Error('Project failed to save');
    error.statusCode = 422;
    return next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  let project;
  try {
    project = await Project.findById(req.params.id);
  } catch(err) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    error.errors = { message: "No project found with that id" };
    return next(error);
  }
  try {
    return res.json(project);
  }
  catch(err) {
    return res.json([]);
  }
})


module.exports = router;
