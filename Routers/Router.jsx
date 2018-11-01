import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    browserHistory
} from 'react-router-dom';
import About from '../JSX/Components/About';
import DevNewDA from '../JSX/Components/DevNewDA';
import Home from '../JSX/Components/Home';

const Router = () => {
    return <BrowserRouter history={browserHistory}>
        <div>
            <Route  path="/" component={Home} />
            <Route  path="/about" component={About} />
            <Route  path="/DevNewDA" component={DevNewDA} />
        </div>
    </BrowserRouter>
}
export default Router;


