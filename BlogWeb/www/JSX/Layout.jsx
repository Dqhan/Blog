import Header from './Components/Header';
import LoginDialog from './LoginDialog';

export default class R.Layout extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            dialogStatus: false,
        }
        return this;
    }

    initBind() {
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.HandleConformClick = this.HandleConformClick.bind(this);
        this.handleCloseLoginDialogCallback = this.handleCloseLoginDialogCallback.bind(this);
    }

    componentDidMount() {
    }

    handleLoginClick() {
        this.setState(Object.assign(this.state, {
            dialogStatus: true
        }))
    }

    handleCloseLoginDialogCallback() {
        this.setState({
            dialogStatus: false
        })
    }

    renderInfo() {
        let profile = localStorage.getItem('profile_info');
        if (profile === null) {
            return <React.Fragment>
                <span className="fi-page-arrow-right-b"></span>
                <RButton text="Login" className="layout-user-info-login-btn" onClick={this.handleLoginClick} />
            </React.Fragment>
        }
        profile = JSON.parse(profile);
        let loginType = localStorage.getItem('login_type');
        if (toString.call(loginType) !== '[object Undefined]')
            loginType = parseInt(loginType);
        switch (loginType) {
            case Util.LOGIN_TYPE.GitHub:
                return <React.Fragment>
                    <img onClick={this.handleLogout} className="layout-user-info-pic" src={`${profile.avatar_url}`}></img>
                    <ul className="layout-user-info-desc">
                        <li>{profile.name}</li>
                        <li>{profile.company}</li>
                        <li>{profile.location}</li>
                    </ul>
                </React.Fragment>
            case Util.LOGIN_TYPE.WeChat:
                return <React.Fragment>

                </React.Fragment>
            case Util.LOGIN_TYPE.Account:
                return <React.Fragment>
                    <span onClick={this.handleLogout} className="fi-page-user-a layout-user-info-pic"></span>
                    <span className="layout-user-info-desc account">{profile.username}</span>
                </React.Fragment>
            default:
                return <React.Fragment>
                    <span className="fi-page-arrow-right-b"></span>
                    <RButton text="Login" className="layout-user-info-login-btn" onClick={this.handleLoginClick} />
                </React.Fragment>
        }
    }

    handleLogout() {
        $$.conform({
            message: 'Are you sure to logout?',
            footer: true,
            handleClick: this.HandleConformClick
        });
    }

    HandleConformClick() {
        localStorage.removeItem('login_type');
        localStorage.removeItem('profile_info');
        localStorage.removeItem('access_token');
        this.setState({
            dialogStatus: false
        });
    }

    logout() {
        let clr = {
            [Util.LOGIN_TYPE.Account]: function () {

            },
            [Util.LOGIN_TYPE.GitHub]: function () {

            },
            [Util.LOGIN_TYPE.WeChat]: function () {

            }
        };
        var url = clr[this.loginType](),
            option = {
                url: url,
                method: "DELETE"
            };
        $$.loading(true);
        return fetchUtility(option);
    }

    render() {
        return <div id={this.props.id} className='layout'>
            <div className='layout-container'>
                {/* <a className='git-link' href="https://github.com/Dqhan" target="_blank" /> */}
                {
                    !this.props.isHome && <React.Fragment>
                        <Header isHome={false} />
                        <div className="layout-header"> </div>
                        <div className="layout-header-info">
                            <div className="layout-header-info-main">{this.props.logo}</div>
                            <div className="layout-header-info-sub">Welcome to Dqhan's Blog</div>
                            <div className="layout-header-info-link">
                                <ul>
                                    <li>
                                        <a className="font-icon iconfont icon-github" href="https://github.com/Dqhan" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="font-icon iconfont icon-CN_cnblogs" href="https://www.cnblogs.com/moran1992/" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="font-icon iconfont icon-weixin" href="https://www.dqhanhouse.com" target="_blank"></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="layout-user-info">
                                {
                                    this.renderInfo()
                                }
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div className='layout-main'>
                    <div className='layout-main-content'>
                        {this.props.children}
                    </div>
                </div>
            </div>
            {
                this.state.dialogStatus && <LoginDialog
                    handleCloseLoginDialogCallback={this.handleCloseLoginDialogCallback}
                />
            }
        </div>
    }
}