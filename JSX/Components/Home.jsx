import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../AUI/Banner';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return <div className='home-page'>
            <header className='header'>
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
            <Banner />
            <section>

            </section>
            <footer>

            </footer>
        </div>
    }
}