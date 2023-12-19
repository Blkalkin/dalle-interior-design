const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateProjectInput = [
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('User is required'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required'),
  handleValidationErrors
];

module.exports = validateProjectInput;