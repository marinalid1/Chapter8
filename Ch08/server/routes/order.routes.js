import express from 'express'
import orderCtrl from '../controllers/order.controller'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/orders/:userId')
  .post(authCtrl.requireSignin, userCtrl.stripeCustomer, productCtrl.decreaseQuantity, orderCtrl.create)

// Pg 384, the list shop API
router.route('/api/orders/shop/:shopId')
  .get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop)

// Pg 381, route for create order API
router.route('/api/orders/user/:userId')
  .get(authCtrl.requireSignin, orderCtrl.listByUser)

// Pg 393, Get status values
router.route('/api/order/status_values')
  .get(orderCtrl.getStatusValues)

// Pg 395, cancel product order
router.route('/api/order/:shopId/cancel/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update)

// Pg 397, Process charge for a product
router.route('/api/order/:orderId/charge/:userId/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, userCtrl.createCharge, orderCtrl.update)

// Pg 394, Update order status
router.route('/api/order/status/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update)

router.route('/api/order/:orderId')
  .get(orderCtrl.read)

// Pg 381, to retrieve the user associated with the :userId parameter in the route, we will use the userById user controller method
router.param('userId', userCtrl.userByID)
router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)
router.param('orderId', orderCtrl.orderByID)

export default router
