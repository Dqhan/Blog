import React from 'react';
import Router from '../Routers/Router';
import {
    HashRouter
} from 'react-router-dom';

export default class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <HashRouter>
            <Router />
        </HashRouter>
    }
}
