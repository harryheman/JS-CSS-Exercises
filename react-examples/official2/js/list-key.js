var root = document.getElementById('root');
var nums = [1, 3, 5, 7, 9];
var list = nums.map(function (num) {
    return React.createElement(
        'li',
        null,
        num
    );
});

function NumberList(props) {
    var numbers = props.numbers;
    var listItems = numbers.map(function (n) {
        return React.createElement(
            'li',
            { key: n },
            n
        );
    });

    return React.createElement(
        'ul',
        null,
        listItems
    );
}

function Blog(props) {
    var sidebar = React.createElement(
        'ul',
        null,
        props.posts.map(function (p) {
            return React.createElement(
                'li',
                { key: p.id },
                p.id,
                '. ',
                p.title
            );
        })
    );
    var content = props.posts.map(function (p) {
        return React.createElement(
            'div',
            { key: p.id },
            React.createElement(
                'h3',
                null,
                p.title
            ),
            React.createElement(
                'p',
                null,
                p.content
            )
        );
    });
    return React.createElement(
        'div',
        null,
        sidebar,
        React.createElement('hr', null),
        content
    );
}

var posts = [{ id: 1, title: 'title1', content: 'some awesome text' }, { id: 2, title: 'title2', content: 'some awesome text' }];

ReactDOM.render(React.createElement(Blog, { posts: posts }), root);