const cart = {
  itemTotal() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length
      }
    }
    return 0
  },
  // Pg 350, takes the product item and a state-updating callback function as parameters and stores the updated details in localStorage and executes the callback that was passed
  addItem(item, cb) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.push({
        product: item,
        quantity: 1,
        shop: item.shop._id
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      cb()
    }
  },
  // Pg 356, index of the product being updates in the cart array and the new quantity value as paramters and updates the details stores in localStorage
  updateCart(itemIndex, quantity) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart[itemIndex].quantity = quantity
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  },
  // Pg 354, Retrieving cart details
  getCart() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'))
      }
    }
    return []
  },
  // Pg 357, index of the product to be removed from the array, splices itn out, and updates localStorage beofre returning the updated cart array
  removeItem(itemIndex) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.splice(itemIndex, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
  },
  // Pg 377, Empty cart
  emptyCart(cb) {
    if (typeof window !== "undefined") {
      localStorage.removeItem('cart')
      cb()
    }
  }
}

export default cart
