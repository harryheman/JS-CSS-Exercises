function NumberList (props) {
    const numbers = props.numbers 
    return (
        <ul>
            {
                numbers.map(number => 
                        <ListItem key={number.toString()}
                                    value={number} />
                    )
            }
        </ul>
    )
}

function ListItem (props) {
    return <li>{props.value}</li>
}

const numbers = [1,2,3,4,5]
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.querySelector('#number-list')
)