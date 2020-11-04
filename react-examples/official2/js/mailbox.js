function MailBox(props) {
    var unreadMsgs = props.unreadMsgs;
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h3',
            null,
            'Hello!'
        ),
        unreadMsgs.length > 0 && React.createElement(
            'p',
            null,
            'You have ',
            unreadMsgs.length,
            ' unread messages.'
        )
    );
}

var msgs = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(React.createElement(MailBox, { unreadMsgs: msgs }), document.getElementById('root'));