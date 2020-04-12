import {
    Link
} from 'react-router-dom';
export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            headerScrolled: false
        }
        return this;
    }

    initBind() {

    }

    componentDidMount() {
        this.initScrollComputed();
    }

    initScrollComputed() {
        var self = this;
        window.addEventListener("scroll", function (e) {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t != 0) {
                self.setState({
                    headerScrolled: true
                })
            } else {
                self.setState({
                    headerScrolled: false
                })
            }
        });
    }

    render() {
        return <header className={this.state.headerScrolled ? 'home-header header-scrolled' : 'home-header'}>
            <div className='home-header-container'>
                <h1 className={this.props.isHome ? "homeTitle" : "subTitle"}>博客园|Dqhan's Blog</h1>
                <nav className='nav-bar'>
                    <ul>
                        <li className='nav-item'><Link to='/'>首页</Link></li>
                        <li className='nav-item'><Link to='/sub/blog'>博客</Link></li>
                        <li className='nav-item'><Link to='/sub/overview'>总览</Link></li>
                        <li className='nav-item'><Link to='/sub/production'>UI Framework</Link></li>
                        <li className='nav-item'><Link to='/sub/leavemessage'>留言板</Link></li>
                        <li className='nav-item'><Link to='/sub/mark'>点滴</Link></li>
                        <li className='nav-item'><Link to='/sub/verse'>心灵鸡汤</Link></li>
                        <li className='nav-item'><Link to='/sub/about'>关于我</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    }
}