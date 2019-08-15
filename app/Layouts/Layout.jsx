import React from 'react';
import Header from '../JSX/Components/Header';
import Summary from '../JSX/Components/Summary/Summary';
import {
    Link
} from 'react-router-dom';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initComputed()
    }

    initComputed() {
    }

    render() {
        return <div id={this.props.id} className='layout'>
            <div className='layout-container'>
                <a className='git-link' href="https://github.com/Dqhan" target="_blank" />
                <div className='layout-menus'>
                    <h1>{this.props.logo}</h1>
                    <nav>
                        <ul>
                            <li className='nav-item'><Link to='/'>首页</Link></li>
                            <li className='nav-item'><Link to='/sub/blog'>博客</Link></li>
                            <li className='nav-item'><Link to='/sub/production'>作品</Link></li>
                            <li className='nav-item'><Link to='/sub/leavemessage'>留言板</Link></li>
                            <li className='nav-item'><Link to='/sub/about'>关于</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="layout-header"> </div>
                <div className="layout-header-info">
                    <div className="layout-header-info-main">博客园|Dqhan's Blog</div>
                    <div className="layout-header-info-sub">Welcome to Dqhan's Blog</div>
                    <div className="layout-header-info-link">
                        <ui>
                            <li>
                                <a></a>
                            </li>
                            <li>
                                <a></a>
                            </li>
                            <li>
                                <a></a>
                            </li>
                        </ui>
                    </div>
                </div>
                <div className='layout-main'>
                    <div className='content'>
                        {this.props.children}
                    </div>
                    <Summary history={this.props.history} />
                </div>
            </div>
            <footer>
                <div>no footer</div>
            </footer>
        </div>
    }
}