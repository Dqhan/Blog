import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import Life from '../JSX/Components/Life';
import LeaveMessage from '../JSX/Components/LeaveMessage';
import Blog from '../JSX/Components/Blog';
import About from '../JSX/Components/About';
import Production from '../JSX/Components/Production';

const SubRouter = () => {
    return <Switch>
            <Route path="/sub/lifemark" component={Life} />
            <Route path="/sub/leavemessage" component={LeaveMessage} />
            <Route path="/sub/blog" component={Blog} />
            <Route path="/sub/production" component={Production} />
            <Route path="/sub/about" component={About} />
        </Switch>
}
export default SubRouter;


