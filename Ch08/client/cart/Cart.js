import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import CartItems from './CartItems'
import {StripeProvider} from 'react-stripe-elements'
import config from './../../config/config'
import Checkout from './Checkout'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
}))

export default function Cart () {
  const classes = useStyles()
  const [checkout, setCheckout] = useState(false)

  // Pg 252, showCheckout method to update the checkout value
  const showCheckout = val => {
    setCheckout(val)
  }

  // Pg 352, the cart view
  // Pg 366, wrap the Checkout component we added to Cart.js with the StripeProvider component from react-stripe-elements so that the Elements component in Checkout has access to the Stripe instance
    return (<div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <CartItems checkout={checkout}
                     setCheckout={showCheckout}/>
        </Grid>
        {checkout &&
          <Grid item xs={6} sm={6}>
            <StripeProvider apiKey={config.stripe_test_api_key}>
              <Checkout/>
            </StripeProvider>
          </Grid>}
        </Grid>
      </div>)
}
