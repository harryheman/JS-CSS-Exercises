async function start() {
  return await Promise.resolve('Async is working.')
}

start().then(console.log)

const unused = 12

class Util {
  static id = Date.now()
}

console.log('Util id => ', Util.id)

import('lodash').then((_) => {
  console.log(_.random(0, 10, true))
})
