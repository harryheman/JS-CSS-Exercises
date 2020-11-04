var formatUser = function formatUser(user) {
    return user.firstName + ' ' + user.lastName;
};

var user = {
    firstName: 'John',
    lastName: 'Smith'
};

var el = React.createElement(
    'h1',
    null,
    'Hello, ',
    formatUser(user),
    '!'
);

ReactDOM.render(el, document.getElementById('root'));