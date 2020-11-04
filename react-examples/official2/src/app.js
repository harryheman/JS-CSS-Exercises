const formatUser = (user) => `${user.firstName} ${user.lastName}`

const user = {
    firstName: 'John',
    lastName: 'Smith'
}

const el = (
    <h1>
        Hello, {formatUser(user)}!
    </h1>
)

ReactDOM.render(
    el,
    document.getElementById('root')
)