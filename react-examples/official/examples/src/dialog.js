function FancyBorder(props) {
    return (
        <div className={'fancy-border fancy-border-' + props.color}>
            {props.children}
        </div>
    )
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="dialog-title">
                {props.title}
            </h1>
            <p className="dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
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
                title="Программа исследования Марса"
                message="Как к вам обращаться?">
                    <input
                        value={this.state.login}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSignUp}>
                        Присоединиться!
                    </button>
            </Dialog>
        )
    }

    handleChange(e) {
        this.setState({login: e.target.value})
    }

    handleSignUp() {
        alert(`Добро пожаловать на борт, ${this.state.login}!`)
    }
}

ReactDOM.render(
    <SignUpDialog />,
    document.querySelector('#dialog-example')
)