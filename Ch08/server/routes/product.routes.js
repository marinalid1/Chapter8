import express from 'express'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()

// Pg 320, the create product API
// Pg 324, the products by shop API
router.route('/api/products/by/:shopId')
  .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create)
  .get(productCtrl.listByShop)

// Pg 329, latest products
router.route('/api/products/latest')
  .get(productCtrl.listLatest)

  // Pg 330, related products
router.route('/api/products/related/:productId')
  .get(productCtrl.listRelated)

  // Pg 339, the categories API
router.route('/api/products/categories')
  .get(productCtrl.listCategories)

// Pg 340, the search products API
router.route('/api/products')
  .get(productCtrl.list)

  // Pg 334, read a product API
router.route('/api/products/:productId')
  .get(productCtrl.read)

router.route('/api/product/image/:productId')
  .get(productCtrl.photo, productCtrl.defaultPhoto)
router.route('/api/product/defaultphoto')
  .get(productCtrl.defaultPhoto)

// Pg 338, Put route
// Pg 338, delete route
router.route('/api/product/:shopId/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove)

router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)

export default router
