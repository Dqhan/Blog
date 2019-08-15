import Editor from '../../AUI/Editor';
export default class Write extends React.Component {
    constructor(props) {
        super(props);
        this
            .initState()
            .initBind();
    }

    initState() {
        return this;
    }

    initBind() {
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleCancelClick() {
        this.props.history.push('/sub/blog');
    }

    render() {
        return <Editor
            cancel={this.handleCancelClick}
        />
    }
}