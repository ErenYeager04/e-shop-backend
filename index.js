require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const productRoutes = require('./routes/product')
const mongoose = require('mongoose')

const app = express()

// middlewares
app.use(cors({
  origin: "*",
  credentials: true
}))
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/auth',authRoutes)
app.use("/cart", cartRoutes)
app.use("/product", productRoutes)

mongoose.connect(process.env.MONGOOSE_URL)
.then( () => {
  app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port " + process.env.PORT)
})})
.catch((err) => {
  console.log(err)
}) 

