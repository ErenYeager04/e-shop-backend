const Cart = require('../models/Cart')
const Product = require('../models/Products')

const makeCart = async (req, res) => {
  const { _id, quantity } = req.body
  const userId = req.user.id

  const exists = await Cart.findOne({userId})
  if(!exists){
    // If cart for user does not exist, creates one
    try{
    const cart = await Cart.create({userId, cartProducts:[{_id, quantity }] })
    res.status(200).json(cart)
    }catch(err) {
    res.status(400).json(err.message)
    }
 
  }else{
    // Check if the product already exists in the cart
    const existingProduct = exists.cartProducts.find(p => p._id == _id);
    if (existingProduct) {
      // Product already exists, so sets the quantity 
      try {
        const update = await Cart.findOneAndUpdate(
          { userId, 'cartProducts._id': _id },
          { $set: { 'cartProducts.$.quantity': quantity } }
        );
          res.status(200).json(update)
      }catch (err){
        res.status(400).json(err.message)
      }
      
    }else {
      // Product does not exist, adds one with amount
      try {
        const updatedCart = await Cart.findOneAndUpdate({userId},
        {
         $push : { cartProducts:  {_id, quantity} }
        })
        res.status(200).json(updatedCart);
      } catch (err) {
        res.status(400).json(err.message);
      }
    }
  }
}


const getProductsFromCart = async (req, res) => {
  const userId = req.user.id

  const exists = await Cart.findOne({userId})
  if(!exists){
    res.status(200).json('Your dont have a cart')
  } else{

    try{
    const result = await Cart.aggregate([
      { $match: { userId: userId } },
      { $unwind: "$cartProducts" },
      {
        $lookup: {
          from: "products",
          localField: "cartProducts._id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $addFields: {
          "product.quantity": "$cartProducts.quantity"
        }
      },
      {
        $project: {
          _id: "$product._id",
          _id: "$_id",
          productId: "$product._id",
          quantity: "$product.quantity",
          title: "$product.title",
          desc: "$product.desc",
          img: "$product.img",
          price: "$product.price",
          brand: "$product.brand",
          type: "$product.type",
        }
      }
      ])
      res.status(200).json(result)
    }catch(err) {
      res.status(400).json(err.message);
    }
  }

}

const deleteProduct = async (req, res) => {
  const userId = req.user.id
  const { _id } = req.body
  try{
    const user = await Cart.findOne({userId})
    const result = await user.updateOne({ $pull: { cartProducts: { _id: _id } } })
  
    res.status(200).json('Product was deleted')

  }catch(err){
    res.status(400).json(err.message)
  }

}


module.exports = {makeCart, getProductsFromCart, deleteProduct}