const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


