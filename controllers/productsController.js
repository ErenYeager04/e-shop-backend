const Product = require('../models/Products')
const { uploadFile } = require('../middleware/s3')


const makeProduct = async (req, res) => {
  const { title, desc, price, type, brand} = req.body 
  // Gets img from multer
  const file = req.file
  
  try{
    // Uploads to AWS database
    const imgData = await uploadFile(file)
    // Gets URL of img
    const img = imgData.Location
    const product = await Product.create({title, desc, img, price, type, brand})
    res.status(200).json(product)

  } catch(err) {
    res.status(400).json(err)
  }

}

const getProducts = async (req, res) => {
  const {brand, type } = req.query
  // Parses numbers
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  
  // Code to check everything is ok
  let startIndex = page
  if(page > 0){
    startIndex = (page - 1) * limit

  }
  
  const endIndex = page * limit

  let query = {}

  if(brand){
    query.brand = brand
  }
  if(type){
    query.type = type
  }


  try{
    // Finds product by query
    const result = await Product.find(query).skip(startIndex).limit(limit)
    res.status(200).json(result)

  }catch(err){
    res.status(400).json(err.message)
  }
  
}

const getOneProduct = async (req, res) => {
  const {id} = req.params
  try{
    const result = await Product.findById(id)
    res.status(200).json(result)
  }catch(err){
    res.status(400).json(err.message)
  }
}

const addRating = async (req, res) => {
  const { _id, rating } = req.body
  const userId = req.user.id

  // Checks if user already rated or not
  const exists = await Product.findOne({ _id })
  const hasRating = exists.rating.find(p => p.userId == userId)
  // If not adds rating
  if (!hasRating) {
    try {
      const newRating = {
        userId: userId,
        rating: rating
      }

      const update = await Product.findOneAndUpdate(
        { _id: _id },
        { $push: { rating: newRating } },
        { new: true }
      )

      res.status(200).json(update)
    } catch (err) {
      res.status(400).json(err.message)
    }
  } else {
    res.status(400).json('You have already rated this product.')
  }
}





module.exports = {
  makeProduct,
  getProducts,
  getOneProduct,
  addRating
}