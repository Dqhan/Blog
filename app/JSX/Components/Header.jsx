import {
    Link
} from 'react-router-dom';
export default class Header extends React.Component {
    render() {
        return <header className={this.props.headerScrolled ? 'home-header header-scrolled' : 'home-header'}>
            <div className='home-header-container'>
                <h1>Dqhan's Blog</h1>
                <nav className='nav-bar'>
                    <ul>
                        <li className='nav-item'><Link to='/'>首页</Link></li>
                        <li className='nav-item'><Link to='/sub/blog'>博客</Link></li>
                        <li className='nav-item'><Link to='/sub/production'>作品</Link></li>
                        <li className='nav-item'><Link to='/sub/leavemessage'>留言板</Link></li>
                        <li className='nav-item'><Link to='/sub/about'>关于</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    }
}