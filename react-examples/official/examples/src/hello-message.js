class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                Hello, {this.props.name}!
            </div>
        )
    }
}

ReactDOM.render(
    <HelloMessage name="Igor" />,
    document.querySelector('#hello-example')
)