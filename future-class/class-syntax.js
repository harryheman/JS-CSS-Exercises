const log = console.log

class C {
  /*
  constructor() {
    this.publicInstanceField = 'Публичное поле экземпляра'
    this.#privateInstanceField = 'Приватное поле экземпляра'
  }
  */

  // class field declarations
  // https://github.com/tc39/proposal-class-fields
  publicInstanceField = 'Публичное поле экземпляра'

  #privateInstanceField = 'Приватное поле экземпляра'

  publicInstanceMethod() {
    log('Публичный метод экземляра')
  }

  // private methods and getter/setters
  // https://github.com/tc39/proposal-private-methods
  #privateInstanceMethod() {
    log('Приватный метод экземпляра')
  }

  getPrivateInstanceField() {
    log(this.#privateInstanceField)
  }

  getPrivateInstanceMethod() {
    this.#privateInstanceMethod()
  }

  // static class features
  // https://github.com/tc39/proposal-static-class-features
  static publicClassField = 'Публичное поле класса'
  static #privateClassField = 'Приватное поле класса'

  static publicClassMethod() {
    log('Публичный метод класса')
  }

  static #privateClassMethod() {
    log('Приватный метод класса')
  }

  static getPrivateClassField() {
    log(C.#privateClassField)
  }

  static getPrivateClassMethod() {
    C.#privateClassMethod()
  }

  getPublicAndPrivateClassFieldsFromInstance() {
    log(C.publicClassField, C.#privateClassField)
  }

  static getPublicAndPrivateInstanceFieldsFromClass() {
    log(this.publicInstanceField)
    log(this.#privateInstanceField)
  }
}

const c = new C()

console.log(c.publicInstanceField) // Публичное поле экземпляра

// console.log(c.#privateInstanceField) // SyntaxError: Private field '#privateInstanceField' must be declared in an enclosing class

c.getPrivateInstanceField() // Приватное поле экземпляра

c.publicInstanceMethod() // Публичный метод экземляра

// c.#privateInstanceMethod() // Error
c.getPrivateInstanceMethod() // Приватный метод экземпляра

// C.#field = 'Приватное поле класса' // Error

console.log(C.publicClassField) // Публичное поле класса

// console.log(C.#privateClassField) // Error
C.getPrivateClassField() // Приватное поле класса

C.publicClassMethod() // Публичный метод класса

// C.#privateClassMethod() // Error
C.getPrivateClassMethod() // Приватный метод класса

c.getPublicAndPrivateClassFieldsFromInstance()
// Публичное поле класса Приватное поле класса

// C.getPublicAndPrivateInstanceFieldsFromClass()
// undefined
// TypeError: Cannot read private member #privateInstanceField from an object whose class did not declare it
