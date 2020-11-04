class Reservation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const target = e.target 
        const name = target.name
        const value = name === 'isGoing' ?
        target.checked :
        target.value 

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(`I'm ${this.state.isGoing ? 'going' : 'not going anywhere'}${this.state.isGoing ? ` with ${this.state.numberOfGuests} guests.` : '.'}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    I'm going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleChange} />
                </label>
                <input type="submit" value="Send" />
            </form>
        )
    }
}

ReactDOM.render(
    <Reservation />,
    document.querySelector('#multiple-inputs')
)