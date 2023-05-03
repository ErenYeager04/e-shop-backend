const { body } = require('express-validator')

// User email and password validation
const validation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

module.exports = { validation }