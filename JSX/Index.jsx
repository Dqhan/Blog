import React from 'react';
import Router from '../Routers/Router';
import Layout  from '../Layouts/Index';
import {
    Route,
    HashRouter,
    Switch
} from 'react-router-dom';

export default class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <HashRouter>
        <Layout>
            <Router />
        </Layout>
        </HashRouter>
    }
}
