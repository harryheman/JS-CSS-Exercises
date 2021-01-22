function Counter(initialValue = 0) {
  this.count = initialValue
}

/*
Counter.prototype.increment = function () {
  this.count += 1
  return this
}

Counter.prototype.decrement = function () {
  this.count -= 1
  return this
}

Counter.prototype.reset = function () {
  this.count = 0
  return this
}

Counter.prototype.getInfo = function () {
  console.log(this.count)
  return this
}
*/

/*
;(function () {
  this.increment = function () {
    this.count += 1
    return this
  }

  this.decrement = function () {
    this.count -= 1
    return this
  }

  this.reset = function () {
    this.count = 0
    return this
  }

  this.getInfo = function () {
    console.log(this.count)
    return this
  }
}.call(Counter.prototype))
*/

Object.assign(Counter.prototype, {
  increment() {
    this.count += 1
    return this
  },

  decrement() {
    this.count -= 1
    return this
  },

  reset() {
    this.count = 0
    return this
  },

  getInfo() {
    console.log(this.count)
    return this
  }
})

const counter = new Counter()
// const _counter = Counter() // TypeError: Cannot set property 'count' of undefined

counter
  .increment()
  .increment()
  .getInfo() // 2
  .decrement()
  .getInfo() // 1
  .reset()
  .getInfo() // 0

class _Counter {
  constructor(initialValue = 0) {
    this.count = initialValue
  }

  increment() {
    this.count += 1
    return this
  }

  decrement() {
    this.count -= 1
    return this
  }

  reset() {
    this.count = 0
    return this
  }

  getInfo() {
    console.log(this.count)
    return this
  }
}

const _counter = new _Counter()
_counter
  .increment()
  .increment()
  .getInfo() // 2
  .decrement()
  .getInfo() // 1
  .reset()
  .getInfo() // 0
