const root = document.getElementById('root')

class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        root.insertAdjacentHTML('beforeend', `<p>Send name is ${this.state.value}</p>`)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Send" />
            </form>
        )
    }
}

class FlavorForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: 'coconut'}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit (e) {
        root.insertAdjacentHTML('beforeend', `<p>Your favourite taste is ${this.state.value}</p>`)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Choose your favourite taste:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value='grapefruit'>Grapefruit</option>
                        <option value='lime'>Lime</option>
                        <option value='coconut'>Coconut</option>
                        <option value='mango'>Mango</option>
                    </select>
                </label>
                <input type="submit" value="Send" />
            </form>
        )
    }
}

class Reservation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGoing: true,
            numberOfG: 2
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const target = e.target
        const value = target.name === 'isGoing' ? target.checked : target.value 
        const name = target.name 

        this.setState({
            [name]: value 
        })
    }

    render() {
        return (
            <form>
                <label>
                Пойдут:
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleChange} />
                </label>
                <br />
                <label>
                Количество гостей:
                <input
                    name="numberOfG"
                    type="number"
                    value={this.state.numberOfG}
                    onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}

ReactDOM.render(
    <Reservation />,
    root
)