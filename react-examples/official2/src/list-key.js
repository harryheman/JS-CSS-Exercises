const root = document.getElementById('root')
const nums = [1,3,5,7,9]
const list = nums.map(num => <li>{num}</li>)


function NumberList(props) {
    const numbers = props.numbers
    const listItems = numbers.map(n => <li key={n}>{n}</li>)

    return (
        <ul>{listItems}</ul>
    )
}

function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map(p => 
                <li key={p.id}>
                    {p.id}. {p.title}
                </li>
            )}
        </ul>
    )
    const content = props.posts.map(p => 
        <div key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
        </div>
    )
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    )
}

const posts = [
    {id: 1, title: 'title1', content: 'some awesome text'},
    {id: 2, title: 'title2', content: 'some awesome text'},
]

ReactDOM.render(
    <Blog posts={posts} />,
    root
)