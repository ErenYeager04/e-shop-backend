const router = require('express').Router()
const { makeProduct, getProducts, getOneProduct,addRating } = require('../controllers/productsController')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/makeProduct', checkRoleMiddleware(), upload.single('img'), makeProduct)

router.get('/getProducts', getProducts)

router.get('/getProducts/:id', getOneProduct)

router.post('/addRating',authMiddleware, addRating)



module.exports = router