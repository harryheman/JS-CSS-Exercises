var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var root = document.getElementById('root');

var NameForm = function (_React$Component) {
    _inherits(NameForm, _React$Component);

    function NameForm(props) {
        _classCallCheck(this, NameForm);

        var _this = _possibleConstructorReturn(this, (NameForm.__proto__ || Object.getPrototypeOf(NameForm)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(NameForm, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ value: e.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            root.insertAdjacentHTML('beforeend', '<p>Send name is ' + this.state.value + '</p>');
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement(
                    'label',
                    null,
                    'Name:',
                    React.createElement('input', {
                        type: 'text',
                        value: this.state.value,
                        onChange: this.handleChange
                    })
                ),
                React.createElement('input', { type: 'submit', value: 'Send' })
            );
        }
    }]);

    return NameForm;
}(React.Component);

var FlavorForm = function (_React$Component2) {
    _inherits(FlavorForm, _React$Component2);

    function FlavorForm(props) {
        _classCallCheck(this, FlavorForm);

        var _this2 = _possibleConstructorReturn(this, (FlavorForm.__proto__ || Object.getPrototypeOf(FlavorForm)).call(this, props));

        _this2.state = { value: 'coconut' };

        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        return _this2;
    }

    _createClass(FlavorForm, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ value: e.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            root.insertAdjacentHTML('beforeend', '<p>Your favourite taste is ' + this.state.value + '</p>');
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement(
                    'label',
                    null,
                    'Choose your favourite taste:',
                    React.createElement(
                        'select',
                        { value: this.state.value, onChange: this.handleChange },
                        React.createElement(
                            'option',
                            { value: 'grapefruit' },
                            'Grapefruit'
                        ),
                        React.createElement(
                            'option',
                            { value: 'lime' },
                            'Lime'
                        ),
                        React.createElement(
                            'option',
                            { value: 'coconut' },
                            'Coconut'
                        ),
                        React.createElement(
                            'option',
                            { value: 'mango' },
                            'Mango'
                        )
                    )
                ),
                React.createElement('input', { type: 'submit', value: 'Send' })
            );
        }
    }]);

    return FlavorForm;
}(React.Component);

var Reservation = function (_React$Component3) {
    _inherits(Reservation, _React$Component3);

    function Reservation(props) {
        _classCallCheck(this, Reservation);

        var _this3 = _possibleConstructorReturn(this, (Reservation.__proto__ || Object.getPrototypeOf(Reservation)).call(this, props));

        _this3.state = {
            isGoing: true,
            numberOfG: 2
        };

        _this3.handleChange = _this3.handleChange.bind(_this3);
        return _this3;
    }

    _createClass(Reservation, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var target = e.target;
            var value = target.name === 'isGoing' ? target.checked : target.value;
            var name = target.name;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                null,
                React.createElement(
                    'label',
                    null,
                    '\u041F\u043E\u0439\u0434\u0443\u0442:',
                    React.createElement('input', {
                        name: 'isGoing',
                        type: 'checkbox',
                        checked: this.state.isGoing,
                        onChange: this.handleChange })
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    '\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0433\u043E\u0441\u0442\u0435\u0439:',
                    React.createElement('input', {
                        name: 'numberOfG',
                        type: 'number',
                        value: this.state.numberOfG,
                        onChange: this.handleChange })
                )
            );
        }
    }]);

    return Reservation;
}(React.Component);

ReactDOM.render(React.createElement(Reservation, null), root);