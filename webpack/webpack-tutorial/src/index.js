import './style.css'
import './style.scss'
import {
    getUsers
} from './common/usersAPI'
import moment from 'moment'

console.log('ok')

const fancyFunc = () => [1, 2]

const [a, b] = fancyFunc()

const getUserModule = () =>
    import( /* webpackChunkName: 'usersAPI' */ './common/usersApi')

const btn = document.querySelector('button')

btn.addEventListener('click', () => {
    getUserModule().then(({
        getUsers
    }) => {
        getUsers().then(json => console.table(json))
    })
})