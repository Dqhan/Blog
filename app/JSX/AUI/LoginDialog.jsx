export default class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            loginType: Util.LOGIN_TYPE.Default
        }
        return this;
    };

    initBind() {
        this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
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

    initWeChat() {
        this.weChart = new WxLogin({
            id: "wechat_login_container", // 需要显示的容器id
            appid: "wx65df7a4974221854",  // 公众号appid wx*******
            scope: "snsapi_base ",  // 网页默认即可
            redirect_uri: "http://10.2.118.52/#/oAuthPromisition", // 授权成功后回调的url
            state: "", // 可设置为简单的随机数加session用来校验
            style: "black", // 提供"black"、"white"可选。二维码的样式
            href: "" // 外部css文件url，需要https
        });
    }

    registerHandler() {
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

    loginHandler() {
        let request = {
            username: this.state.userName,
            password: this.state.password
        }, option = {
            url: "./api/user/login",
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
                return <React.Fragment>
                    <div className="">
                        <label>账号：</label>
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={this.handleUserNameChanged}
                        />
                    </div>
                    <div className="">
                        <label>密码：</label>
                        <input
                            type="text"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </div>
                    <RButton text="登录" onClick={this.loginHandler} />
                </React.Fragment>
            case Util.LOGIN_TYPE.Register:
                return <React.Fragment>
                    <div className="">
                        <label>账号：</label>
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={this.handleUserNameChanged}
                        />
                    </div>
                    <div className="">
                        <label>密码：</label>
                        <input
                            type="text"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </div>
                    <div className="">
                        <RButton text="注册" onClick={this.registerHandler} />
                        <RButton
                            text="返回"
                            onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Default)}
                        />
                    </div>
                </React.Fragment>
            case Util.LOGIN_TYPE.Account:
                return (
                    <React.Fragment>
                        <div className="">
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="登录" onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Login)} />
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="注册" onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Register)} />
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="返回" onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Default)} />
                        </div>
                    </React.Fragment>
                );
            case Util.LOGIN_TYPE.RegisterSuccessfully:
                return <div className=''>
                    <div>
                        Register Successfully!
                    </div>
                    <div>
                        <RButton text="登录" onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Login)} />
                    </div>
                </div>
            case Util.LOGIN_TYPE.WeChat:
                return <div id="wechat_login_container">
                    <div></div>
                </div>
            case Util.LOGIN_TYPE.Default:
                return <React.Fragment>
                    <label>选择登陆方式</label>
                    <div>
                        <div onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.Account)}>
                            <div className="font-icon iconfont icon-user"></div>
                            <div>Account</div>
                            <i className="light"></i>
                        </div>
                        <div onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.GitHub)}>
                            <div className="font-icon iconfont icon-github"></div>
                            <div>GitHub</div>
                            <i className="light"></i>
                        </div>
                        <div onClick={this.changeLogin.bind(this, Util.LOGIN_TYPE.WeChat)}>
                            <div className="font-icon iconfont icon-weixin"></div>
                            <div>WeChat</div>
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