function MailBox(props) {
    const unreadMsgs = props.unreadMsgs
    return (
        <div>
            <h3>Hello!</h3>
    {unreadMsgs.length > 0 && <p>You have {unreadMsgs.length} unread messages.</p>}
        </div>
    )
}

const msgs = ['React', 'Re: React', 'Re:Re: React']
ReactDOM.render(
    <MailBox unreadMsgs={msgs} />,
    document.getElementById('root')
)