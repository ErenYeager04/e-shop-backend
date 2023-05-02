const router = require('express').Router()
const {userSignup, userLogin} = require('../controllers/authController')
const { validation } = require('../middleware/validation')


router.post('/signup', validation, userSignup)

router.post('/login', validation, userLogin)

module.exports = router