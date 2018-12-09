import React from 'react';
import {
    Link
} from 'react-router-dom';
export default class Header extends React.Component {
    render() {
        return <header className='header'>
            <div className='container'>
                <h1>Dqhan's Blog</h1>
                <nav className='nav-bar'>
                    <ul>
                        <li className='nav-item'><Link to='/'>首页</Link></li>
                        <li className='nav-item'><Link to='/sub/lifemark'>生活</Link></li>
                        <li className='nav-item'><Link to='/sub/workmark'>工作</Link></li>
                        <li className='nav-item'><Link to='/sub/blog'>博客</Link></li>
                        <li className='nav-item'><Link to='/sub/production'>作品</Link></li>
                        <li className='nav-item'><Link to='/sub/about'>关于</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    }
}