import React from 'react';
import Nav from './Nav';
export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className='layout-container'>
            <Nav />
            {this.props.children}
        </div>
    }
}