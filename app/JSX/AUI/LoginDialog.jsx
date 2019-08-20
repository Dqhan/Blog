const LoginType = {
    Account: 0,
    WeChart: 1,
    GitHub: 2,
    Default: 3,
    Login: 4,
    Register: 5,
    RegisterSuccessfully: 6,
};

export default class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            loginType: LoginType.Default
        }
        return this;
    };

    initBind() {
        this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    };

    changeLogin(type) {
        this.setState({
            loginType: type
        }, () => {
            if (this.state.loginType == LoginType.WeChart) this.initWeChat();
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
        let data = {
            userName: this.state.userName,
            password: this.state.password
        }, option = {
            url: "./api/user/register",
            method: "POST",
            data: data
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                $$.loading(false);
                this.setState({
                    loginType: LoginType.RegisterSuccessfully
                })
            })
            .catch(e => {
                $$.loading(false);
                $$.conform({
                    message: e,
                    status: "show"
                });
            });
    }

    handleGitHubLogin() {
        let clientId = "5f2b3eb585cd289ca088",
            path = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,public_repo`;
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

    renderLoginComponent() {
        switch (this.state.loginType) {
            case LoginType.Login:
                return <React.Fragment>
                    <div className="">
                        <label>账号：</label>
                        <input
                            type="text"
                            value={this.state.number}
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
            case LoginType.Register:
                return <React.Fragment>
                    <div className="">
                        <label>账号：</label>
                        <input
                            type="text"
                            value={this.state.number}
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
                            onClick={this.changeLogin.bind(this, LoginType.Default)}
                        />
                    </div>
                </React.Fragment>
            case LoginType.Account:
                return (
                    <React.Fragment>
                        <div className="">
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="登录" onClick={this.changeLogin.bind(this, LoginType.Login)} />
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="注册" onClick={this.changeLogin.bind(this, LoginType.Register)} />
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="返回" onClick={this.changeLogin.bind(this, LoginType.Default)} />
                        </div>
                    </React.Fragment>
                );
            case LoginType.RegisterSuccessfully:
                return <div className=''>
                    <div>
                        Register Successfully!
                    </div>
                    <div>
                        <RButton text="登录" onClick={this.changeLogin.bind(this, LoginType.Login)} />
                    </div>
                </div>
            case LoginType.WeChart:
                return <div id="wechat_login_container">
                    <div></div>
                </div>
            case LoginType.Default:
                return <React.Fragment>
                    <label>选择登陆方式</label>
                    <div>
                        <div onClick={this.changeLogin.bind(this, LoginType.Account)}>
                            <div className="font-icon iconfont icon-user"></div>
                            <div>Account</div>
                            <i className="light"></i>
                        </div>
                        <div onClick={this.handleGitHubLogin}>
                            <div className="font-icon iconfont icon-github"></div>
                            <div>GitHub</div>
                            <i className="light"></i>
                        </div>
                        <div onClick={this.changeLogin.bind(this, LoginType.WeChart)}>
                            <div className="font-icon iconfont icon-weixin"></div>
                            <div>WeChat</div>
                            <i className="light"></i>
                        </div>
                    </div>
                </React.Fragment>
        }
    }

    render() {
        return <$$.Dialog
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
        </$$.Dialog>
    }
}