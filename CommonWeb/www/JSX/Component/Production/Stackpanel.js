class Stackpanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='stackpanel'>
            <div className='stackpanel-title'>
                <span className='fi-page-holiday-a'></span>
                {this.props.text}
            </div>
            <div className='stackpanel-content'>
                {this.props.children}
            </div>
        </div>
    }
}

export default Stackpanel;