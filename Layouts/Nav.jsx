import React from 'react';
import {
    Link,
    BrowserRouter
} from 'react-router-dom';
export default class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <BrowserRouter>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/DevNewDA">DevNewDA</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </BrowserRouter>
    }
}