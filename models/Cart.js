const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  }, 
  cartProducts: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)