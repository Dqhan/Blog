export default class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            loginType: Util.LOGIN_TYPE.Default,
            password: '',
            conformPwd: ''
        }
        return this;
    };

    initBind() {
        this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleConformPwdChanged = this.handleConformPwdChanged.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    };

    changeLogin(type) {
        this.setState({
            loginType: type
        }, () => {
            localStorage.setItem('login_type', type);
            if (this.state.loginType == Util.LOGIN_TYPE.WeChat) this.initWeChat();
            if (this.state.loginType == Util.LOGIN_TYPE.GitHub) this.handleGitHubLogin();
        });
    }

    handleGitHubLogin() {
        let path = `https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${CommonUtil.Config.github.redirect_uri}&scope=user%2Crepo&client_id=${CommonUtil.Config.github.client_id}`;
        location.href = path;
    }

    handleUserNameChanged(e) {
        this.setState(
            Object.assign(this.state, {
                userName: e.target.value
            })
        );
    }

    handlePasswordChanged(e) {
        this.setState(
            Object.assign(this.state, {
                password: e.target.value
            })
        );
    }

    handleConformPwdChanged(e) {
        this.setState(
            Object.assign(this.state, {
                conformPwd: e.target.value
            })
        );
    }

    registerHandler() {
        if (this.state.password != this.state.conformPwd) {
            R.conform({
                message: "The two passwords you entered did not match.",
                footer: true
            });
            return;
        }
        let request = {
            username: this.state.userName,
            password: this.state.password
        }, option = {
            url: "./api/user/register",
            method: "POST",
            body: request
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                $$.loading(false);
                this.setState({
                    loginType: Util.LOGIN_TYPE.RegisterSuccessfully
                })
            })
            .catch(e => {
                $$.loading(false);
                $$.conform({
                    message: e
                });
            });
    }

    loginHandler() {
        let request = {
            username: this.state.userName,
            password: this.state.password
        }, option = {
            url: "./user/api/login",
            method: "POST",
            body: request
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                $$.loading(false);
                if (res.status === 0) {
                    localStorage.setItem('access_token', res.result.accessToken);
                    res.result.profileInfo.name = res.result.profileInfo.username;
                    localStorage.setItem('profile_info', JSON.stringify(res.result.profileInfo));
                    localStorage.setItem('login_type', Util.LOGIN_TYPE.Account);
                    location.href = `http://${CommonUtil.Config.HOST}`;
                }
                else {
                    $$.conform({
                        message: 'Login failed.',
                    });
                }
            })
            .catch(e => {
                $$.loading(false);
                console.log(e);
            });
    }

    renderLoginComponent() {
        switch (this.state.loginType) {
            case Util.LOGIN_TYPE.Login:
                return <div className='login-content'>
                    <div className="login-content-item">
                        <label>Account:</label>
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={this.handleUserNameChanged}
                        />
                    </div>
                    <div className="login-content-item">
                        <label>Password:</label>
                        <input
                            type="text"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </div>
                    <div className="login-content-item">
                        <button className="login-content-item-btn" onClick={this.loginHandler}>Login</button>
                    </div>
                </div>
            case Util.LOGIN_TYPE.Register:
                return <div className='register-content'>
                    <div className="register-content-item">
                        <label>Account:</label>
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={this.handleUserNameChanged}
                        />
                    </div>
                    <div className="register-content-item">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </div>
                    <div className="register-content-item">
                        <label>Conform:</label>
                        <input
                            type="password"
                            value={this.state.conformPwd}
                            onChange={this.handleConformPwdChanged}
                        />
                    </div>
                    <div className="register-content-item">
                        <button className='register-content-item-btn' onClick={this.registerHandler}>Register</button>
                        <button className='register-content-item-btn' onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Default)}>Return</button>
                    </div>
                </div>
            case Util.LOGIN_TYPE.Account:
                return <React.Fragment>
                    <div className="login-account-content">
                        <div className='login-action-content-item' onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Login)}>
                            <div className="font-icon iconfont icon-user"></div>
                            <div>Login</div>
                            <i className="light"></i>
                        </div>
                        <div className='login-action-content-item' onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Register)}>
                            <div className="font-icon fi-page-enroll-a"></div>
                            <div>Register</div>
                            <i className="light"></i>
                        </div>
                        <div className='login-action-content-item' onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Default)}>
                            <div className="font-icon fi-page-submit-a"></div>
                            <div>Return</div>
                            <i className="light"></i>
                        </div>
                    </div>
                </React.Fragment>
            case Util.LOGIN_TYPE.RegisterSuccessfully:
                return <div className=''>
                    <div>
                        Register Successfully!
                    </div>
                    <div>
                        <button onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Login)}>Login</button>
                    </div>
                </div>
            case Util.LOGIN_TYPE.WeChat:
                return <div id="wechat_login_container">
                    <div></div>
                </div>
            case Util.LOGIN_TYPE.Default:
                return <React.Fragment>
                    <label>选择登陆方式</label>
                    <div className='login-action-content'>
                        <div className='login-action-content-item' onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Account)}>
                            <div className="font-icon iconfont icon-user"></div>
                            <div>Account</div>
                            <i className="light"></i>
                        </div>
                        <div className='login-action-content-item' onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.GitHub)}>
                            <div className="font-icon iconfont icon-github"></div>
                            <div>GitHub</div>
                            <i className="light"></i>
                        </div>
                    </div>
                </React.Fragment>
        }
    }

    render() {
        return <R.Dialog
            id="blog-dialog-login"
            title="Login"
            width={400}
            height={400}
            status={true}
            foot={[
                {
                    text: "close",
                    click: this.props.handleCloseLoginDialogCallback
                }
            ]}
        >
            <div className='login-contain'>{this.renderLoginComponent()}</div>
        </R.Dialog>
    }
}