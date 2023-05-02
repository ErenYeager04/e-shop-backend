const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  }, 
  products: [
    {
      productId: {
        type: String
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)