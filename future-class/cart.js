const products = [
  {
    id: '1',
    title: 'Хлеб',
    price: 50
  },
  {
    id: '2',
    title: 'Масло',
    price: 150
  },
  {
    id: '3',
    title: 'Молоко',
    price: 100
  }
]

// module
const cartModule = (() => {
  let cart = []

  function getProductCount() {
    return cart.length
  }

  function getTotalPrice() {
    return cart.reduce((total, { price }) => (total += price), 0)
  }

  return {
    addProducts(products) {
      products.forEach((product) => {
        cart.push(product)
      })
    },
    removeProduct(obj) {
      for (const key in obj) {
        cart = cart.filter((product) => product[key] !== obj[key])
      }
    },
    getInfo() {
      console.log(
        `В корзине ${getProductCount()} товар(а) на ${
          getProductCount() > 1 ? 'общую ' : ''
        }сумму ${getTotalPrice()} рублей`
      )
    }
  }
})()

console.log(cartModule) // { addProducts: ƒ, removeProduct: ƒ, getInfo: ƒ }

cartModule.addProducts(products)
cartModule.getInfo()
// В корзине 3 товар(а) на общую сумму 300 рублей

cartModule.removeProduct({ id: '2' })
cartModule.getInfo()
// В корзине 2 товар(а) на общую сумму 150 рублей

console.log(cartModule.cart) // undefined
// cartModule.getProductCount() // TypeError: cartModule.getProductCount is not a function

// factory
function cartFactory() {
  let cart = []

  function getProductCount() {
    return cart.length
  }

  function getTotalPrice() {
    return cart.reduce((total, { price }) => (total += price), 0)
  }

  return {
    addProducts(products) {
      products.forEach((product) => {
        cart.push(product)
      })
    },
    removeProduct(obj) {
      for (const key in obj) {
        cart = cart.filter((product) => product[key] !== obj[key])
      }
    },
    getInfo() {
      console.log(
        `В корзине ${getProductCount()} товар(а) на ${
          getProductCount() > 1 ? 'общую ' : ''
        }сумму ${getTotalPrice()} рублей`
      )
    }
  }
}

const cart = cartFactory()

cart.addProducts(products)
cart.getInfo()
// В корзине 3 товар(а) на общую сумму 300 рублей

cart.removeProduct({ title: 'Молоко' })
cart.getInfo()
// В корзине 2 товар(а) на сумму 200 рублей

console.log(cart.cart) // undefined
// cart.getProductCount() // TypeError: cart.getProductCount is not a function

// class
class Cart {
  #cart = []

  #getProductCount() {
    return this.#cart.length
  }

  #getTotalPrice() {
    return this.#cart.reduce((total, { price }) => (total += price), 0)
  }

  addProducts(products) {
    this.#cart.push(...products)
  }

  removeProduct(obj) {
    for (const key in obj) {
      this.#cart = this.#cart.filter((product) => product[key] !== obj[key])
    }
  }

  getInfo() {
    console.log(
      `В корзине ${this.#getProductCount()} товар(а) на ${
        this.#getProductCount() > 1 ? 'общую ' : ''
      }сумму ${this.#getTotalPrice()} рублей`
    )
  }
}

const _cart = new Cart()

_cart.addProducts(products)
_cart.getInfo()
// В корзине 3 товар(а) на общую сумму 300 рублей

_cart.removeProduct({ id: '1', price: 100 })
_cart.getInfo()
// В корзине 1 товар(а) на общую сумму 150 рублей

console.log(_cart.cart) // undefined
// console.log(_cart.#cart) // SyntaxError: Private field '#cart' must be declared in an enclosing class
// _cart.getTotalPrice() // TypeError: cart.getTotalPrice is not a function
// _cart.#getTotalPrice() // Error
