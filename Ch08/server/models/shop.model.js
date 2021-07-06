import mongoose from 'mongoose'
const ShopSchema = new mongoose.Schema({

  // Pg 294, Shop name
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  // // Pg 294, Shop logo image
  image: {
    data: Buffer,
    contentType: String
  },
  // Pg 294, Shop description
  description: {
    type: String,
    trim: true
  },
  // Pg 295, created at and updated at times
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  // Pg 294, Shop owner
  owner: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

export default mongoose.model('Shop', ShopSchema)
