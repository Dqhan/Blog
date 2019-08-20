import React from 'react';
import Header from '../JSX/Components/Header';
import LoginDialog from '../JSX/AUI/LoginDialog';

export default class Layout extends React.Component {
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
        this.setState({
            dialogStatus: true
        })
    }

    handleCloseLoginDialogCallback() {
        this.setState({
            dialogStatus: false
        })
    }

    renderInfo() {
        let profile = localStorage.getItem('github_api_oauth_profile_info');
        profile = JSON.parse(profile);
        if (profile) return <React.Fragment>
            <img onClick={this.handleLogout} className="layout-user-info-pic" src={`${profile.avatar_url}`}></img>
            <ul className="layout-user-info-desc">
                <li>{profile.name}</li>
                <li>{profile.company}</li>
                <li>{profile.location}</li>
            </ul>
        </React.Fragment>
        else return <React.Fragment>
            <span className="fi-page-arrow-right-b"></span>
            <RButton text="Login" className="layout-user-info-login-btn" onClick={this.handleLoginClick} />
        </React.Fragment>
    }

    handleLogout() {
        $$.conform({
            message: 'Are you sure to logout',
            footer: true,
            handleClick: this.HandleConformClick
        });
    }

    HandleConformClick() {
        localStorage.deleteItem('github_api_oauth_profile_info');
        localStorage.deleteItem('github_api_oauth_token');
        this.setState(this.state);
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
                                <ui>
                                    <li>
                                        <a className="font-icon iconfont icon-github" href="https://github.com/Dqhan" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="font-icon iconfont icon-CN_cnblogs" href="https://www.cnblogs.com/moran1992/" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="font-icon iconfont icon-weixin" href="https://www.dqhanhouse.com" target="_blank"></a>
                                    </li>
                                </ui>
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
            <footer>
                <div>no footer</div>
            </footer>
            {
                this.state.dialogStatus && <LoginDialog
                    handleCloseLoginDialogCallback={this.handleCloseLoginDialogCallback}
                />
            }
        </div>
    }
}