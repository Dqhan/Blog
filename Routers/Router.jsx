import React, { Component } from 'react';
import {
    Route,
    HashRouter,
    Switch
} from 'react-router-dom';
import About from '../JSX/Components/About';
import DevNewDA from '../JSX/Components/DevNewDA';
import Home from '../JSX/Components/Home';

const Router = () => {
    return <Switch>
            <Route path="/about" component={About} />
            <Route path="/DevNewDA" component={DevNewDA} />
            <Route path="/" component={Home} />
        </Switch>
}
export default Router;


