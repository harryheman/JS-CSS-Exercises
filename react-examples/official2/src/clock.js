class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {time: new Date().toLocaleTimeString()}
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        })
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <p>It's {this.state.time}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)