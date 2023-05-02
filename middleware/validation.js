const { body } = require('express-validator')

const validation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

module.exports = { validation }