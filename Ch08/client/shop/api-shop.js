// Pg 298, Fetching the create API in the view
const create = async (params, credentials, shop) => {
  try {
    let response = await fetch('/api/shops/by/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: shop
    })
      return response.json()
    } catch(err) { 
      console.log(err)
    }
}

const list = async (signal) => {
  try {
    let response = await fetch('/api/shops', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  }catch(err) {
    console.log(err)
  }
}

// Pg 306, Fetch all shops owned by a user for the view
const listByOwner = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/shops/by/'+params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/shop/' + params.shopId, {
      method: 'GET',
      signal: signal,
    })
    return response.json()
  }catch(err) {
    console.log(err)
  }
}

const update = async (params, credentials, shop) => {
  try {
    let response = await fetch('/api/shops/' + params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: shop
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/shops/' + params.shopId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  list,
  listByOwner,
  read,
  update,
  remove
}
