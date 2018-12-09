import React from 'react';
import Header from '../JSX/Components/Header';
import Summary from '../JSX/Components/Summary';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='layout'>
            {this.props.hasHeader && <Header />}
            <div className='layout-container'>
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