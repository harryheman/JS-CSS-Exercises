var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function UserGreeting(props) {
    return React.createElement(
        'h1',
        null,
        'Hello, friend!'
    );
}

function GuestGreeting(props) {
    return React.createElement(
        'h1',
        null,
        'Login, please!'
    );
}

function Greeting(props) {
    if (props.isLoggedIn) {
        return React.createElement(UserGreeting, null);
    } else {
        return React.createElement(GuestGreeting, null);
    }
}

function LoginButton(props) {
    return React.createElement(
        'button',
        { onClick: props.onClick },
        'Login'
    );
}

function LogoutButton(props) {
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

        _this.handleLoginClick = _this.handleLoginClick.bind(_this);
        _this.handleLogoutClick = _this.handleLogoutClick.bind(_this);
        _this.state = { isLoggedIn: false };
        return _this;
    }

    _createClass(LoginControl, [{
        key: 'handleLoginClick',
        value: function handleLoginClick() {
            this.setState({ isLoggedIn: true });
        }
    }, {
        key: 'handleLogoutClick',
        value: function handleLogoutClick() {
            this.setState({ isLoggedIn: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var isLoggedIn = this.state.isLoggedIn;
            var button = void 0;
            if (isLoggedIn) {
                button = React.createElement(LogoutButton, { onClick: this.handleLogoutClick });
            } else {
                button = React.createElement(LoginButton, { onClick: this.handleLoginClick });
            }

            return React.createElement(
                'div',
                null,
                React.createElement(Greeting, { isLoggedIn: isLoggedIn }),
                button
            );
        }
    }]);

    return LoginControl;
}(React.Component);

ReactDOM.render(React.createElement(LoginControl, null), document.querySelector('#greeting-example'));