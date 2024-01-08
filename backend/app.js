const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
require('dotenv').config();


const csurf = require('csurf');
const cors = require('cors');
const { isProduction } = require('./config/keys');

require('./models/User');
require('./models/Comment');
require('./models/Project');
require('./config/passport');
const passport = require('passport');

const usersRouter = require('./routes/api/users');
const commentsRouter = require('./routes/api/comments');
const csrfRouter = require('./routes/api/csrf');
const projectsRouter = require('./routes/api/projects');
const imagesRouter = require('./routes/api/images');
const rateLimitMiddleware = require("./routes/api/limit");


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

if (!isProduction) {
  app.use(cors());
}

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/projects', projectsRouter);

app.use('/api/images', rateLimitMiddleware) // this comes first so it goes through the middle ware then 

app.use('/api/images', imagesRouter);




app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});
  
const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});


module.exports = app;