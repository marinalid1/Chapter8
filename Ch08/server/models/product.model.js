import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
  // Pg 318, product name
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  // Pg 318, product image
  image: {
    data: Buffer,
    contentType: String
  },
  // Pg 318, description
  description: {
    type: String,
    trim: true
  },
  // Pg 318, product category
  category: {
    type: String
  },
  // Pg 319, product quantity
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  // Pg 319, product price
  price: {
    type: Number,
    required: "Price is required"
  },
  // Pg 319, created and updated at times
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  //Pg 319, product shop
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'}
})

export default mongoose.model('Product', ProductSchema)
