function BoilingVerdict(props) {
    if (props.cel >= 100) {
        return <p>Вода закипит.</p>
    } else {
        return <p>Вода не закипит.</p>
    }
}

function toCel(fahr) {
    return (fahr - 32) * 5 / 9
}

function toFahr(cel) {
    return (cel * 9 / 5) + 32
}

function convert(temp, convert) {
    const input = parseFloat(temp)
    if (Number.isNaN(input)) {
        return ''
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString()
}

const scaleNames = {
    c: 'Цельсия',
    f: 'Фаренгейта'
}

class TempInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {temp: ''}
    }

    handleChange(e) {
        this.props.onTempChange(e.target.value)
    }

    render() {
        const temp = this.props.temp
        const scale = this.props.scale
        return (
            <fieldset>
                <legend>Введите температуру в градусах {scaleNames[scale]}:</legend>
                <input
                value={temp}
                onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calc extends React.Component {
    constructor(props) {
        super(props)
        this.handleCelChange = this.handleCelChange.bind(this)
        this.handleFahrChange = this.handleFahrChange.bind(this)
        this.state = {temp: '', scale: 'c'}
    }

    handleCelChange(temp) {
        this.setState({scale: 'c', temp})
    }

    handleFahrChange(temp) {
        this.setState({scale: 'f', temp})
    }

    render() {
        const scale = this.state.scale
        const temp = this.state.temp
        const cel = scale === 'f' ? convert(temp, toCel) : temp
        const fahr = scale === 'c' ? convert(temp, toFahr) : temp
        return (
            <div>
                <TempInput
                    scale="c"
                    temp={cel}
                    onTempChange={this.handleCelChange}
                />
                <TempInput
                    scale="f"
                    temp={fahr}
                    onTempChange={this.handleFahrChange}
                />
                <BoilingVerdict cel={parseFloat(cel)} />
            </div>
        )
    }
}

const root = document.querySelector('#root')

ReactDOM.render(
    <Calc />,
    root
)