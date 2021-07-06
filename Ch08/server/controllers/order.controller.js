import {Order, CartItem} from '../models/order.model'
import errorHandler from './../helpers/dbErrorHandler'

// Pg 383, Create controller method
const create = async (req, res) => {
  try {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    let result = await order.save()
    res.status(200).json(result)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 384, will retrieve the orders that have products purchased with the mathcing shop ID, then popualte the ID, name, and price fields for each product
const listByShop = async (req, res) => {
  try {
    let orders = await Order.find({"products.shop": req.shop._id})
      .populate({path: 'products.product', select: '_id name price'})
      .sort('-created')
      .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 394, the update controller method will query the Order collection and find the order with the CartItem object that matches the product and set the status value of this matched CartItem in the products array of the order
const update = async (req, res) => {
  try {
    let order = await Order.update({'products._id':req.body.cartItemId}, {'$set': {
        'products.$.status': req.body.status
    }})
      res.json(order)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// Pg 393, method will return the enum values for the status field from the CartItem schema
const getStatusValues = (req, res) => {
  res.json(CartItem.schema.path('status').enumValues)
}

// Pg 397, to retrieve the order assoicated with the orderId paramter in the route, we will use the orderById order controller method
const orderByID = async (req, res, next, id) => {
  try {
    let order = await Order.findById(id).populate('products.product', 'name price').populate('products.shop', 'name').exec()
    if (!order)
      return res.status('400').json({
        error: "Order not found"
      })
    req.order = order
    next()
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let orders = await Order.find({ "user": req.profile._id })
        .sort('-created')
        .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = (req, res) => {
  return res.json(req.order)
}

export default {
  create,
  listByShop,
  update,
  getStatusValues,
  orderByID,
  listByUser,
  read
}
