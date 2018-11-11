import React from 'react';
class Button extends React.Component{
    constructor(props){
            super(props);
    }

    render(){
        return <div className='aui-btn-outer'>
            <button className='aui-btn-inner'>{this.props.text}</button>
        </div>
    }
}

window.RButton = Button;