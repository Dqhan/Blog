class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <React.Fragment>
            <button className='aui-btn' style={this.props.style} onClick={this.props.onClick} > {this.props.text}</button>
        </React.Fragment>
    }
}

window.RButton = Button;