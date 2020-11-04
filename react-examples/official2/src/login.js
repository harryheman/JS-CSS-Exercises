function UserGreet(props) {
    return <h3>С возвращением!</h3>
}

function GuestGreet(props) {
    return <h3>Войдите, пожалуйста.</h3>
}

function Greet(props) {
    const isLogged = props.isLogged
    if (isLogged) {
        return <UserGreet />
    } else {
        return <GuestGreet />
    }
}

function LoginBtn(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    )
}

function LogoutBtn(props) {
    return (
        <button onClick={props.onClick}>
            Logout 
        </button>
    )
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.state = {isLogged: false}
    }

    handleLogin() {
        this.setState({isLogged: true})
    }

    handleLogout() {
        this.setState({isLogged: false})
    }

    render() {
        const isLogged = this.state.isLogged
        let button 
        if (isLogged) {
            button = <LogoutBtn onClick={this.handleLogout} />
        } else {
            button = <LoginBtn onClick={this.handleLogin} />
        }

        return (
            <div>
                <Greet isLogged={isLogged} />
                {button}
            </div>
        )
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
)