import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewShop from './shop/NewShop'
import Shops from './shop/Shops'
import MyShops from './shop/MyShops'
import Shop from './shop/Shop'
import EditShop from './shop/EditShop'
import NewProduct from './product/NewProduct'
import EditProduct from './product/EditProduct'
import Product from './product/Product'
import Cart from './cart/Cart'
import StripeConnect from './user/StripeConnect'
import ShopOrders from './order/ShopOrders'
import Order from './order/Order'

// Pg 301, add a PrivateRoute that will render this form only for authenicated users at /seller/shop/new
// Pg 305, the Shops compoenent will be accessed by the end user at /shops/all, which is set up with React Router and declard in MainRouter.js
// Pg 308, add a PrivateROute in the MainROuter component, which will render this component only for an authticated user at /seller/shops
// Pg 312, shop compoenent will be accessed in the browser at the /shops/:shopId route
// Pg 315, the EditShop component
// Pg 323, add a PrivateRoute in the MainRouter, which will render this form only for authorized users at the URL /seller/:shopId/products/new:
// Pg 335, the product can be accessed in the browser at the /product/:productID route
// Pg 337, Editing and deleting a product
// Pg 353, cart component will be accessed at the /cart route, so we need to add a route to the MainRouter component
// Pg 362, MERN Marketplace redirect URI is set to /seller/stripe/connect, which will render the StripeCOnnect component
// Pg 385, the shoporders component
const MainRouter = () => {
  return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <Route path="/cart" component={Cart}/>
        <Route path="/product/:productId" component={Product}/>
        <Route path="/shops/all" component={Shops}/>
        <Route path="/shops/:shopId" component={Shop}/>

        <Route path="/order/:orderId" component={Order}/>
        <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders}/>

        <PrivateRoute path="/seller/shops" component={MyShops}/>
        <PrivateRoute path="/seller/shop/new" component={NewShop}/>
        <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop}/>
        <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct}/>
        <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct}/>

        <Route path="/seller/stripe/connect" component={StripeConnect}/>
      </Switch>
    </div>)
}

export default MainRouter
