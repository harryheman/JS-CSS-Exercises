import {
    Select
} from './select/select.js'
import './select/style.scss'

const select = new Select('#select', {
    placeholder: 'Choose element',
    // selectedId: '3',
    data: [{
            id: '1',
            value: 'React'
        },
        {
            id: '2',
            value: 'Vue'
        },
        {
            id: '3',
            value: 'Angular'
        },
        {
            id: '4',
            value: 'React Native'
        },
        {
            id: '5',
            value: 'Next'
        },
        {
            id: '6',
            value: 'Nuxt'
        }
    ],
    onSelect(item) {
        console.log('Selected item', item)
    }
})

window.s = select