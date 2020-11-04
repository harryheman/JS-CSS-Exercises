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

    handleSubmit(e) {
        e.preventDefault()
        console.log(`Taste: ${this.state.value}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Choose your favourite taste: 
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Send" />
            </form>
        )
    }
}

ReactDOM.render(
    <FlavorForm />,
    document.querySelector('#select-example')
)