import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import defaultImage from './../../client/assets/images/default.png'

// Pg 320, the create product API
const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    let product = new Product(fields)
    product.shop= req.shop
    if(files.image){
      product.image.data = fs.readFileSync(files.image.path)
      product.image.contentType = files.image.type
    }
    try {
      let result = await product.save()
      res.json(result)
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

// Pg 330, retrives the product from the database and attahces it to the request object to be used in the next method
const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id).populate('shop', '_id name').exec()
    if (!product)
      return res.status('400').json({
        error: "Product not found"
      })
    req.product = product
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve product"
    })
  }
}

const photo = (req, res, next) => {
  if(req.product.image.data){
    res.set("Content-Type", req.product.image.contentType)
    return res.send(req.product.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+defaultImage)
}

const read = (req, res) => {
  req.product.image = undefined
  return res.json(req.product)
}

const update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Photo could not be uploaded"
      })
    }
    let product = req.product
    product = extend(product, fields)
    product.updated = Date.now()
    if(files.image){
      product.image.data = fs.readFileSync(files.image.path)
      product.image.contentType = files.image.type
    }
    try {
      let result = await product.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try{
    let product = req.product
    let deletedProduct = await product.remove()
    res.json(deletedProduct)
  
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 324, query the Product collection to return the products matching the given shop's refrence
const listByShop = async (req, res) => {
  try {
    let products = await Product.find({shop: req.shop._id}).populate('shop', '_id name').select('-image')
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 330. find all products, sort the list of products in the database with the created date field from newest to oldest
const listLatest = async (req, res) => {
  try {
    let products = await Product.find({}).sort('-created').limit(5).populate('shop', '_id name').exec()
    res.json(products)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 331, queries the Product collection in the database to find other products with the same category as the given product, excluding the given product and retruns the first five products in the resulting list
const listRelated = async (req, res) => {
  try{
    let products = await Product.find({ "_id": { "$ne": req.product }, "category": req.product.category}).limit(5).populate('shop', '_id name').exec()
    res.json(products)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 339, listCategories controller method queries the Products collection with a distinct call against the category field
const listCategories = async (req, res) => {
  try {
    let products = await Product.distinct('category',{})
    res.json(products)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 340, first process the query paramters in the request, then find products in the given category, if any, with names that partially mathc the provided searcht text
const list = async (req, res) => {
  const query = {}
  if(req.query.search)
    query.name = {'$regex': req.query.search, '$options': "i"}
  if(req.query.category && req.query.category != 'All')
    query.category =  req.query.category
  try {
    let products = await Product.find(query).populate('shop', '_id name').select('-image').exec()
    res.json(products)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 382, Decrease product stock quantity
const decreaseQuantity = async (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
        "updateOne": {
            "filter": { "_id": item.product._id } ,
            "update": { "$inc": {"quantity": -item.quantity} }
        }
    }
   })
   try {
     await Product.bulkWrite(bulkOps, {})
     next()
   } catch (err){
      return res.status(400).json({
        error: "Could not update product"
      })
   }
}

const increaseQuantity = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.product._id, {$inc: {"quantity": req.body.quantity}}, {new: true})
    .exec()
      next()
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  productByID,
  photo,
  defaultPhoto,
  read,
  update,
  remove,
  listByShop,
  listLatest,
  listRelated,
  listCategories,
  list,
  decreaseQuantity,
  increaseQuantity
}
