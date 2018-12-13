import React from 'react';
import Header from '../JSX/Components/Header';
import Summary from '../JSX/Components/Summary';
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
                {
                    this.props.hasModuleLogo &&
                    <div className='summary-logo'>
                        <h1>{this.props.logo}</h1>
                        <nav>
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
                }
                <div className='content'>
                    {this.props.children}
                </div>
                <Summary />
            </div>
            <footer>
                <div>no footer</div>
            </footer>
        </div>
    }
}