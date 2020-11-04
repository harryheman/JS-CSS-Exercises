class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isToggle: true}

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(state => ({
            isToggle: !state.isToggle
        }))
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggle ? 'On' : 'Off'}
            </button>
        )
    }
}

ReactDOM.render(
    <Toggle />,
    document.querySelector('#toggle-example')
)