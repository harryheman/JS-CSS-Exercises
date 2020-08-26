import * as $ from 'jquery'

function createAnalytics() {
    let counter = 0
    let destroyed: boolean = false

    console.log('test')

    const listen = (): number => counter++

    $(document).on('click', listen)

    return {
        destroy() {
            $(document).off('click', listen)
            destroyed = true
        },

        getClicks() {
            if (destroyed) {
                return `Analytics is destroyed. Total clicks = ${counter}`
            }
            return counter
        }
    }
}

window['analytics'] = createAnalytics()