var tick = function tick() {
    var el = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Hello, world!'
        ),
        React.createElement(
            'p',
            null,
            'It\'s ',
            new Date().toLocaleTimeString()
        )
    );
    ReactDOM.render(el, document.getElementById('root'));
};

setInterval(tick, 1000);