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
        return <div className='layout-nav'>
            <ul className='nav-ul'>
                <li className='nav-item'><Link to='/'>首页</Link></li>
                <li className='nav-item'><Link to='/sub/lifemark'>生活</Link></li>
                <li className='nav-item'><Link to='/sub/workmark'>工作</Link></li>
                <li className='nav-item'><Link to='/sub/blog'>博客</Link></li>
                <li className='nav-item'><Link to='/sub/production'>作品</Link></li>
                <li className='nav-item'><Link to='/sub/about'>关于</Link></li>
            </ul>
        </div>
    }
}