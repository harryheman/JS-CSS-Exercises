var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function LoginBtn(props) {
    return React.createElement(
        'button',
        { onClick: props.onClick },
        'Login'
    );
}

function LogoutBtn(props) {
    return React.createElement(
        'button',
        { onClick: props.onClick },
        'Logout'
    );
}

var LoginControl = function (_React$Component) {
    _inherits(LoginControl, _React$Component);

    function LoginControl(props) {
        _classCallCheck(this, LoginControl);

        var _this = _possibleConstructorReturn(this, (LoginControl.__proto__ || Object.getPrototypeOf(LoginControl)).call(this, props));

        _this.handleLogin = _this.handleLogin.bind(_this);
        _this.handleLogout = _this.handleLogout.bind(_this);
        _this.state = { isLogged: false };
        return _this;
    }

    _createClass(LoginControl, [{
        key: 'handleLogin',
        value: function handleLogin() {
            this.setState({ isLogged: true });
        }
    }, {
        key: 'handleLogout',
        value: function handleLogout() {
            this.setState({ isLogged: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var isLogged = this.state.isLogged;
            var button = void 0;
            if (isLogged) {
                button = React.createElement(LogoutBtn, { onClick: this.handleLogout });
            } else {
                button = React.createElement(LoginBtn, { onClick: this.handleLogin });
            }

            return React.createElement(
                'div',
                null,
                React.createElement(Greet, { isLogged: isLogged }),
                button
            );
        }
    }]);

    return LoginControl;
}(React.Component);

ReactDOM.render(React.createElement(LoginControl, null), document.getElementById('root'));