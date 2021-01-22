const log = console.log

function Person({ firstName, lastName, age }) {
  this.firstName = firstName
  this.lastName = lastName
  this.age = age
}

;(function () {
  this.getFullName = function () {
    log(`Этого человека зовут ${this.firstName} ${this.lastName}`)
    return this
  }
  this.getAge = function () {
    log(`Этому человеку ${this.age} лет`)
    return this
  }
  this.saySomething = function (phrase) {
    log(`Этот человек говорит: "${phrase}"`)
    return this
  }
}.call(Person.prototype))

const person = new Person({
  firstName: 'Иван',
  lastName: 'Петров',
  age: 30
})

person.getFullName().getAge().saySomething('Привет!')
/*
  Этого человека зовут Иван Петров
  Этому человеку 30 лет
  Этот человек говорит: "Привет!"
*/

function SubPerson({ lifestyle, skill, ...rest }) {
  Person.call(this, rest)
  this.lifestyle = lifestyle
  this.skill = skill
  this.interest = null
}

SubPerson.prototype = Object.create(Person.prototype)
;(function () {
  this.getInfo = function () {
    this.getFullName()
    log(`Он ${this.lifestyle}`)
    return this
  }

  this.getSkill = function () {
    log(`Этот ${this.lifestyle} умеет ${this.skill}`)
    return this
  }

  this.getLike = function () {
    log(
      `Этот ${this.lifestyle} ${
        this.interest ? `любит ${this.interest}` : 'ничего не любит'
      }`
    )
    return this
  }

  this.setLike = function (value) {
    this.interest = value
    return this
  }
}.call(SubPerson.prototype))

const developer = new SubPerson({
  firstName: 'Петр',
  lastName: 'Иванов',
  age: 25,
  lifestyle: 'разработчик',
  skill: 'писать код на JavaScript'
})

developer
  .getInfo()
  .getAge()
  .saySomething('Программирование - это круто!')
  .getSkill()
  .getLike()
/*
  Этого человека зовут Петр Иванов
  Он разработчик
  Этому человеку 25 лет
  Этот человек говорит: "Программирование - это круто!"
  Этот разработчик умеет писать код на JavaScript
  Этот разработчик ничего не любит
*/

developer.setLike('делать оригами').getLike()
// Этот разработчик любит делать оригами

class _Person {
  constructor({ firstName, lastName, age }) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  getFullName() {
    log(`Этого человека зовут ${this.firstName} ${this.lastName}`)
    return this
  }

  getAge() {
    log(`Этому человеку ${this.age} лет`)
    return this
  }

  saySomething(phrase) {
    log(`Этот человек говорит: "${phrase}"`)
    return this
  }
}

const _person = new Person({
  firstName: 'Иван',
  lastName: 'Петров',
  age: 30
})

_person.getFullName().getAge().saySomething('Пока!')
/*
  Этого человека зовут Иван Петров
  Этому человеку 30 лет
  Этот человек говорит: "Привет!"
*/

class _SubPerson extends _Person {
  constructor({ lifestyle, skill /*, ...rest*/ }) {
    // super(rest)
    super()
    this.lifestyle = lifestyle
    this.skill = skill
    this.interest = null
  }

  getInfo() {
    // super.getFullName()
    this.getFullName()
    log(`Он ${this.lifestyle}`)
    return this
  }

  getSkill() {
    log(`Этот ${this.lifestyle} умеет ${this.skill}`)
    return this
  }

  get like() {
    log(
      `Этот ${this.lifestyle} ${
        this.interest ? `любит ${this.interest}` : 'ничего не любит'
      }`
    )
  }

  set like(value) {
    this.interest = value
  }
}

const _developer = new SubPerson({
  firstName: 'Петр',
  lastName: 'Иванов',
  age: 25,
  lifestyle: 'разработчик',
  skill: 'писать код на JavaScript'
})

_developer
  .getInfo()
  .getAge()
  .saySomething('Программирование - это круто!')
  .getSkill().like
/*
  Этого человека зовут Петр Иванов
  Он разработчик
  Этому человеку 25 лет
  Этот человек говорит: "Программирование - это круто!"
  Этот разработчик умеет писать код на JavaScript
  Этот разработчик ничего не любит
*/

developer.like = 'делать оригами'
developer.like
// Этот разработчик любит делать оригами
