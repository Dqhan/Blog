import React from 'react';
import Router from '../Routers/Router';
import Layout  from '../Layouts/Index';

export default class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <Layout>
            <Router />
        </Layout>
    }
}
