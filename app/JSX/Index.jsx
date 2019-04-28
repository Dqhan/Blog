import React from 'react';
import Router from '../Routers/Router';
import {
    HashRouter
} from 'react-router-dom';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.fooPrototype();
        this.state = {
            userInfo: null
        }
    }

    fooPrototype() {
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }

    componentDidMount() {
        this.retrieveCurrentUser();
    }

    retrieveCurrentUser() {
        let option = {
            url: `./api/user/userInfo`,
            method: 'GET'
        }
        fetchUtility(option).then(res => {
            this.setState({
                userInfo: res
            })
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return <HashRouter>
            <Router userInfo={this.state.userInfo} />
        </HashRouter>
    }
}
