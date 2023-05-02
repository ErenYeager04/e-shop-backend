const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  }, 
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  rating: [
    {
      userId: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        min: 0,
        max: 5
      }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)