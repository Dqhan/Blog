import React from 'react';
import Header from '../JSX/Components/Header';
import Summary from '../JSX/Components/Summary';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='layout'>
            <Header />
            <div className='layout-container'>
                <div className='content inline-block'>
                    {this.props.children}
                </div>
                <Summary />
            </div>
        </div>
    }
}