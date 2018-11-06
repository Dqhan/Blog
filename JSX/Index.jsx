import React from 'react';
import Router from '../Routers/Router';
import {
    HashRouter
} from 'react-router-dom';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.fooPrototype();
    }

    fooPrototype() {
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }

    render() {
        return <HashRouter>
            <Router />
        </HashRouter>
    }
}
