const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


const NUM_SEED_USERS = 10;
const NUM_SEED_COMMENTS = 30;
const NUM_SEED_PROJECTS = 10;

// Create users

const users = [];

users.push(
  new User ({
    username: 'demoUser',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)


for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

// Create projects

const projects = [];

for (let i = 0; i < NUM_SEED_PROJECTS; i++) {
  projects.push(
    new Project ({
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      photoUrls: [
        'https://www.shutterstock.com/image-illustration/3d-render-luxury-hotel-room-2128823966',
        'https://www.shutterstock.com/shutterstock/photos/2265008577/display_1500/stock-photo-general-view-of-luxury-bedroom-interior-with-bed-and-window-2265008577.jpg',
        'https://www.shutterstock.com/shutterstock/photos/2203599317/display_1500/stock-photo-beige-bedroom-interior-bed-and-nightstand-with-art-decoration-carpet-on-hardwood-floor-panoramic-2203599317.jpg',
        'https://www.shutterstock.com/shutterstock/photos/1552224179/display_1500/stock-photo-modern-bedroom-interior-with-a-stylish-combination-of-trendy-blue-and-light-wood-texture-d-1552224179.jpg'
      ],
      public: true
    })
  )
}


// Create comments

const comments = [];

for (let i = 0; i < NUM_SEED_COMMENTS; i++) {
  comments.push(
    new Comment ({
      body: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      project: projects[Math.floor(Math.random() * NUM_SEED_PROJECTS)]._id
    })
  )
}




// Connect to mondodb

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });



// Insert Seeds
const insertSeeds = () => {
console.log("Resetting db and seeding users, projects, and comments...");

User.collection.drop()
                .then(() => Project.collection.drop())
                .then(() => Comment.collection.drop())
                .then(() => User.insertMany(users))
                .then(() => Project.insertMany(projects))
                .then(() => Comment.insertMany(comments))
                .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
}



