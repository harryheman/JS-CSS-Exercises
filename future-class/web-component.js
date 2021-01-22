class Counter extends HTMLButtonElement {
  #xValue = 0

  get #x() {
    return this.#xValue
  }

  set #x(value) {
    this.#xValue = value
    requestAnimationFrame(this.#render.bind(this))
  }

  #increment() {
    this.#x++
  }

  #decrement(e) {
    e.preventDefault()
    this.#x--
  }

  constructor() {
    super()
    this.onclick = this.#increment.bind(this)
    this.oncontextmenu = this.#decrement.bind(this)
  }

  connectedCallback() {
    this.#render()
  }

  #render() {
    this.textContent = `${this.#x} - ${
      this.#x < 0 ? 'отрицательное' : 'положительное'
    } ${this.#x & 1 ? 'нечетное' : 'четное'} число`
  }
}

customElements.define('btn-counter', Counter, { extends: 'button' })
