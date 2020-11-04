function BoilingVerdict(props) {
    if (props.cel >= 100) {
        return <p>Вода закипит.</p>
    } 
    return <p>Вода не закипит.</p>
}

function toCel(f) {
    return (f - 32) * 5 / 9
}

function toFahr(c) {
    return (c * 9 / 5) + 32
}

function tryConvert(temp, convert) {
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
        const cel = scale === 'f' ? tryConvert(temp, toCel) : temp
        const fahr = scale === 'c' ? tryConvert(temp, toFahr) : temp 

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
                <BoilingVerdict cel={cel} />
            </div>
        )
    }
} 

ReactDOM.render(
    <Calc />,
    document.querySelector('#boiling-verdict')
)