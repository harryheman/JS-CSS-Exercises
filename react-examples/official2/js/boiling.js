var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function BoilingVerdict(props) {
    if (props.cel >= 100) {
        return React.createElement(
            'p',
            null,
            '\u0412\u043E\u0434\u0430 \u0437\u0430\u043A\u0438\u043F\u0438\u0442.'
        );
    } else {
        return React.createElement(
            'p',
            null,
            '\u0412\u043E\u0434\u0430 \u043D\u0435 \u0437\u0430\u043A\u0438\u043F\u0438\u0442.'
        );
    }
}

function toCel(fahr) {
    return (fahr - 32) * 5 / 9;
}

function toFahr(cel) {
    return cel * 9 / 5 + 32;
}

function convert(temp, convert) {
    var input = parseFloat(temp);
    if (Number.isNaN(input)) {
        return '';
    }
    var output = convert(input);
    var rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

var scaleNames = {
    c: 'Цельсия',
    f: 'Фаренгейта'
};

var TempInput = function (_React$Component) {
    _inherits(TempInput, _React$Component);

    function TempInput(props) {
        _classCallCheck(this, TempInput);

        var _this = _possibleConstructorReturn(this, (TempInput.__proto__ || Object.getPrototypeOf(TempInput)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        _this.state = { temp: '' };
        return _this;
    }

    _createClass(TempInput, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.props.onTempChange(e.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var temp = this.props.temp;
            var scale = this.props.scale;
            return React.createElement(
                'fieldset',
                null,
                React.createElement(
                    'legend',
                    null,
                    '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0443 \u0432 \u0433\u0440\u0430\u0434\u0443\u0441\u0430\u0445 ',
                    scaleNames[scale],
                    ':'
                ),
                React.createElement('input', {
                    value: temp,
                    onChange: this.handleChange })
            );
        }
    }]);

    return TempInput;
}(React.Component);

var Calc = function (_React$Component2) {
    _inherits(Calc, _React$Component2);

    function Calc(props) {
        _classCallCheck(this, Calc);

        var _this2 = _possibleConstructorReturn(this, (Calc.__proto__ || Object.getPrototypeOf(Calc)).call(this, props));

        _this2.handleCelChange = _this2.handleCelChange.bind(_this2);
        _this2.handleFahrChange = _this2.handleFahrChange.bind(_this2);
        _this2.state = { temp: '', scale: 'c' };
        return _this2;
    }

    _createClass(Calc, [{
        key: 'handleCelChange',
        value: function handleCelChange(temp) {
            this.setState({ scale: 'c', temp: temp });
        }
    }, {
        key: 'handleFahrChange',
        value: function handleFahrChange(temp) {
            this.setState({ scale: 'f', temp: temp });
        }
    }, {
        key: 'render',
        value: function render() {
            var scale = this.state.scale;
            var temp = this.state.temp;
            var cel = scale === 'f' ? convert(temp, toCel) : temp;
            var fahr = scale === 'c' ? convert(temp, toFahr) : temp;
            return React.createElement(
                'div',
                null,
                React.createElement(TempInput, {
                    scale: 'c',
                    temp: cel,
                    onTempChange: this.handleCelChange
                }),
                React.createElement(TempInput, {
                    scale: 'f',
                    temp: fahr,
                    onTempChange: this.handleFahrChange
                }),
                React.createElement(BoilingVerdict, { cel: parseFloat(cel) })
            );
        }
    }]);

    return Calc;
}(React.Component);

var root = document.querySelector('#root');

ReactDOM.render(React.createElement(Calc, null), root);