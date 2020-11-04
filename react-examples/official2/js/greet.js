function UserGreet(props) {
    return React.createElement(
        'h3',
        null,
        '\u0421 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0435\u043C!'
    );
}

function GuestGreet(props) {
    return React.createElement(
        'h3',
        null,
        '\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430.'
    );
}

function Greet(props) {
    var isLogged = props.isLogged;
    if (isLogged) {
        return React.createElement(UserGreet, null);
    } else {
        return React.createElement(GuestGreet, null);
    }
}

ReactDOM.render(React.createElement(Greet, { isLogged: false }), document.getElementById('root'));