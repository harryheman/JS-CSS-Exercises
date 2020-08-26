import {
    Question
} from './question'
import {
    isValid,
    createModal
} from './utils'
import {
    getAuthFrom,
    authWithEmailAndPassword
} from './auth'
import './style.css'

const form = document.querySelector('#form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.querySelector('#modal')

window.addEventListener('load', Question.renderList)

form.addEventListener('submit', submitFormHandler)

modalBtn.addEventListener('click', openModal)

input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toLocaleString()
        }

        submitBtn.disabled = true

        // async request to server to save question
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        })
    }
}

function openModal() {
    createModal('Authentication', getAuthFrom())
    document.querySelector('#auth-form').addEventListener('submit', authFormHandler, {
        once: true
    })
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true

    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Error', content)
    } else {
        createModal('Questions', Question.listToHTML(content))
    }
}
