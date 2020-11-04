import {Remarkable} from 'remarkable'

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props)
        this.md = new Remarkable()
        this.handleChange = this.handleChange.bind(this)
        this.state = { value: 'Hello, **world**!' }
    }

    handleChange(e) {
        this.setState({ value: e.target.value })
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.value) }
    }

    render() {
        return (
            <div className="MarkDownEditor">
                <h3>Editor</h3>
                <label htmlFor="markdown-content">
                    Enter something
                </label>
                <textarea
                    id="markdown-content"
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                />
                <h3>Result</h3>
                <div
                    className="content"
                    dangerouslySetInnerHTML={this.getRawMarkup()}
                >
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <MarkdownEditor />,
    document.querySelector('#markdown-example')
)