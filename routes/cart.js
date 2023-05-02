const router = require('express').Router()
const { makeCart, getProductsFromCart, deleteProduct } = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/makeCart',authMiddleware, makeCart)

router.get('/getProductsFromCart',authMiddleware, getProductsFromCart)

router.delete('/deleteProduct',authMiddleware, deleteProduct )

module.exports = router