// https://www.typescriptlang.org/docs/handbook/mixins.html
function applyMixins(derivedCtor, constructors) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      )
    })
  })
}

class A {
  sayHi() {
    console.log(`${this.name} говорит: "Привет!"`)
  }
  sameName() {
    console.log('Метод класса А')
  }
}

class B {
  sayBye() {
    console.log(`${this.name} говорит: "Пока!"`)
  }
  sameName() {
    console.log('Метод класса B')
  }
}

class C {
  name = 'Иван'
}

applyMixins(C, [A, B])

const c = new C()

// вызываем метод, унаследованный от класса A
c.sayHi() // Иван говорит: "Привет!"

// вызываем метод, унаследованный от класса B
c.sayBye() // Иван говорит: "Пока!"

// последующий метод с таким же названием перезаписывает предыдущий
c.sameName() // Метод класса B
