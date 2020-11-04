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

ReactDOM.render(
    <Greet isLogged={false} />,
    document.getElementById('root')
)