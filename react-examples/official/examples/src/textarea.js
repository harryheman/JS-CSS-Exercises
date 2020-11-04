class MessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'Some message'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(`Message: ${this.state.value}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label >
                    Message:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Send" />
            </form>
        )
    }
}

ReactDOM.render(
    <MessageForm />,
    document.querySelector('#textarea-example')
)