import React from 'react';
import Header from '../JSX/Components/Header';
import Summary from '../JSX/Components/Summary';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerScrolled: false
        }
    }

    componentDidMount() {
        this.initComputed()
    }

    initComputed() {
        this.initScrollComputed();
    }

    initScrollComputed() {
        var self = this;
        window.addEventListener("scroll", function (e) {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t != 0) {
                self.setState({
                    headerScrolled: true
                })
            } else {
                self.setState({
                    headerScrolled: false
                })
            }
        });
    }

    render() {
        return <div className='layout'>
            {this.props.hasHeader && <Header headerScrolled={this.state.headerScrolled} />}
            <div className='layout-container' style={this.props.hasHeader ? { paddingTop: '40px' } : {}}>
                <div className='content'>
                    {this.props.children}
                </div>
                <Summary />
            </div>
            <footer>
                <div>no footer</div>
            </footer>
        </div>
    }
}