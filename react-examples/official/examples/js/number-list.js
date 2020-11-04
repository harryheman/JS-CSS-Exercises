function NumberList(props) {
    var numbers = props.numbers;
    return React.createElement(
        'ul',
        null,
        numbers.map(function (number) {
            return React.createElement(ListItem, { key: number.toString(),
                value: number });
        })
    );
}

function ListItem(props) {
    return React.createElement(
        'li',
        null,
        props.value
    );
}

var numbers = [1, 2, 3, 4, 5];
ReactDOM.render(React.createElement(NumberList, { numbers: numbers }), document.querySelector('#number-list'));