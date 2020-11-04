var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function FancyBorder(props) {
    return React.createElement(
        "div",
        { className: 'fancy-border fancy-border-' + props.color },
        props.children
    );
}

function Dialog(props) {
    return React.createElement(
        FancyBorder,
        { color: "blue" },
        React.createElement(
            "h1",
            { className: "dialog-title" },
            props.title
        ),
        React.createElement(
            "p",
            { className: "dialog-message" },
            props.message
        ),
        props.children
    );
}

var SignUpDialog = function (_React$Component) {
    _inherits(SignUpDialog, _React$Component);

    function SignUpDialog(props) {
        _classCallCheck(this, SignUpDialog);

        var _this = _possibleConstructorReturn(this, (SignUpDialog.__proto__ || Object.getPrototypeOf(SignUpDialog)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSignUp = _this.handleSignUp.bind(_this);
        _this.state = { login: '' };
        return _this;
    }

    _createClass(SignUpDialog, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Dialog,
                {
                    title: "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u041C\u0430\u0440\u0441\u0430",
                    message: "\u041A\u0430\u043A \u043A \u0432\u0430\u043C \u043E\u0431\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F?" },
                React.createElement("input", {
                    value: this.state.login,
                    onChange: this.handleChange
                }),
                React.createElement(
                    "button",
                    { onClick: this.handleSignUp },
                    "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F!"
                )
            );
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            this.setState({ login: e.target.value });
        }
    }, {
        key: "handleSignUp",
        value: function handleSignUp() {
            alert("\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0431\u043E\u0440\u0442, " + this.state.login + "!");
        }
    }]);

    return SignUpDialog;
}(React.Component);

ReactDOM.render(React.createElement(SignUpDialog, null), document.querySelector('#dialog-example'));