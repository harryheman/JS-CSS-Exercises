const eventLog = document.querySelector('.event-log')

const app = {
    updateEvents: ev => {
        eventLog.insertAdjacentHTML('afterbegin', `<p>${ev.lastEventId}: (${ev.type}) ${ev.data}</p>`)
    },

    resetStartBtn: () => document.querySelector('.start-btn').value = 'Start events',

    startEvents: () => {
        app.eventSource = new EventSource('http://localhost:5000/randomEvents')

        app.eventSource.addEventListener('message', ev => {
            console.log(ev)
            if (ev.lastEventId === '-1') {
                app.eventSource.close()
                eventLog.insertAdjacentHTML('afterbegin', '<p>End of stream from server.</p>')
                app.resetStartBtn()
            }
        })

        app.eventSource.addEventListener('coinToss', ev => {
            console.log(ev)
            document.querySelector('.coin-toss').innerHTML = `<p>${ev.data}</p>`
            app.updateEvents(ev)
        })

        app.eventSource.addEventListener('dieRoll', ev => {
            console.log(ev)
            document.querySelector('.die-roll').innerHTML = `<p>${ev.data}</p>`
            app.updateEvents(ev)
        })

        app.eventSource.addEventListener('catFact', ev => {
            console.log(ev)
            document.querySelector('.cat-fact').innerHTML = `<p>${ev.data}</p>`
            app.updateEvents(ev)
        })

        app.eventSource.addEventListener('meme', ev => {
            console.log(ev)
            document.querySelector('.meme').innerHTML = `<img src="${ev.data}" alt="meme">`
            app.updateEvents(ev)
        })

        app.eventSource.addEventListener('error', er => {
            console.error('Got an error: ', er)
            app.eventSource.close()
            app.resetStartBtn()
        })
    }
}

if (!!window.EventSource) {
    document.querySelector('.browser-support').innerHTML = `
        <p>This browser supports EventSource!</p>
        <input type="button" class="start-btn" value="Start Events">
        `
    document.querySelector('.start-btn').addEventListener('click', function (event) {
        if (this.value === 'Start Events') {
            this.value = 'Stop Events'
            app.startEvents()
        } else {
            app.eventSource.close()
            eventLog.insertAdjacentHTML('afterbegin', '<p>Event stream closed by client.</p>')
            app.resetStartBtn()
        }
    })
}