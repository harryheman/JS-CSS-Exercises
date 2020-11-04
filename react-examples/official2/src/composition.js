function FancyBorder(props) {
    return (
        <div className={'FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.state = {login: ''}
    }

    render() {
        return (
            <Dialog
                title="Mars research program"
                message="What's your name?"
            >
            <input
                value={this.state.login}
                onChange={this.handleChange}
            />
            <button onClick={this.handleSignUp}>
                Send me to the Mars!
            </button>
            </Dialog>
        )
    }

    handleChange(e) {
        this.setState({login: e.target.value})
    }

    handleSignUp() {
        root.insertAdjacentHTML('beforeend', `Welcome on board, ${this.state.login}!`)
    }
}

function Dialog(props) {
    return (
        <FancyBorder color='blue'>
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    )
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}

function App() {
    return (
        <SplitPane
        left={
            <Contacts />
        }
        right={
            <Chat />
        }
        />
    )
}

const root = document.querySelector('#root')

ReactDOM.render(
    <SignUpDialog />,
    root
)