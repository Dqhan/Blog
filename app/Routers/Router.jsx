import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Home from '../JSX/Components/Home';
import SubHome from '../JSX/Components/SubHome';

const Router = () => {
    return <Switch>
            <Route exact path="/sub" component={SubHome} />
            <Route exact path="/" component={Home} />
        </Switch>
}
export default Router;


