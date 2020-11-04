const tick = () => {
    const el = (
        <div>
            <h1>Hello, world!</h1>
            <p>It's {new Date().toLocaleTimeString()}</p>
        </div>
    )
    ReactDOM.render(el, document.getElementById('root'))
}

setInterval(tick, 1000)