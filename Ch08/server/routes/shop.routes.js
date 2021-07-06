import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()

// Pg 302, The shops list API
router.route('/api/shops')
  .get(shopCtrl.list)

// Pg 309, the read shop API
router.route('/api/shop/:shopId')
  .get(shopCtrl.read)

// Pg 295, the create shop API
// Pg 305, The shops owner API
router.route('/api/shops/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)

// Pg 312, the edit shop API
// Pg 315, the delete shop API
router.route('/api/shops/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)

router.route('/api/shops/logo/:shopId')
  .get(shopCtrl.photo, shopCtrl.defaultPhoto)

router.route('/api/shops/defaultphoto')
  .get(shopCtrl.defaultPhoto)

router.param('shopId', shopCtrl.shopByID)
// Pg 296, user is available in the request object as profile
router.param('userId', userCtrl.userByID)

export default router
