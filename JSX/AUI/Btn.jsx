import React from 'react';
class Button extends React.Component{
    constructor(props){
            super(props);
    }

    render(){
        return <React.Fragment>
            <button className='aui-btn'>{this.props.text}</button>
        </React.Fragment>
    }
}

window.RButton = Button;