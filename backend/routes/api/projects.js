const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const multer =  require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { awsBucketName, awsBucketRegion, awsAccess, awsSecret } = require('../../config/keys');
const crypto = require('crypto');


randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

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



router.post('/', upload.single('photo'), async (req, res, next) => {
  
  const imageName = randomImageName();

  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    photoUrls: req.body.photoUrls,
    public: req.body.public,
    author: req.body.authorId
  });
  
  newProject.photoUrls=[`https://dalle-interior-design-dev.s3.us-west-1.amazonaws.com/${imageName}`]

  const params = {
    Bucket: awsBucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  }

  try{
    newProject.author = await User.findById(req.body.authorId);
  }catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }try {
    const command = new PutObjectCommand(params);
    const uploadedPhoto = await s3.send(command);
    let project = await newProject.save();
    project = await project.populate('author', '_id');
    return res.json(project);
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

router.patch('/:id/edit', upload.single('photo'), async (req, res, next) => {
  let project;

  try{
    project = await Project.findById(req.params.id);
    console.log(project);
  }catch(err) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    error.errors = { message: "No project found with that id" };
    return next(error);
  }try {
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description ;
    project.public = req.body.public || project.public;
    project.photoUrls = req.body.photoUrls || project.photoUrls;

    if (req.file.buffer){

      const imageName = randomImageName();
      const params = {
        Bucket: awsBucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }

      const command = new PutObjectCommand(params);
      const uploadedPhoto = await s3.send(command);

      project.photoUrls.push(`https://dalle-interior-design-dev.s3.us-west-1.amazonaws.com/${imageName}`)
    }
    console.log("edited project: ", project);
    let editedProject = await project.save();
    // editedProject = await project.populate('author', '_id');
    return res.json(editedProject);
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
    const error = new Error('Project failed to save');
    error.statusCode = 500; // Internal Server Error
    return next(error);
  }
})

router.delete('/:projectId', async (req, res, next) => {
  let project = await Project.findById(req.params.projectId);

  project.photoUrls.forEach( url => {

    const params = { 
      Bucket: awsBucketName,
      Key: url.split('.com/')[1]
    }
    
    const command = new DeleteObjectCommand(params);
    s3.send(command);
  })

  try {
      let project = await Project.deleteOne({ _id: req.params.projectId});

    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      error.errors = { message: 'No project found with that id' };
      throw error;
    }

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
