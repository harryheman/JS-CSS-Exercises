function WarnBanner(props) {
    if (!props.warn) {
        return null 
    }

    return (
        <div>
            Warning!
        </div>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {showWarning: true}
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }))
    }

    render() {
        return (
            <div>
                <WarnBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggle}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        )
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
)