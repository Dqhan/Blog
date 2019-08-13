const LoginType = {
    Account: 0,
    WeChart: 1,
    GitHub: 2,
    Default: 3,
    Login: 4,
    Register: 5,
    RegisterSuccessfully: 6,
    LoginTimeout: 7
};
export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            userName: "",
            password: "",
            messages: [],
            comments: [],
            loginType: LoginType.Default,
            displayUserName: ""
        };
        return this;
    }

    initBind() {
        this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        $$.loading(true);
        CommonUtil.promiseAll([
            this.retrieveLeaveMessage(),
            this.retrieveNewComment(),
            this.getCurrentUserInfo()
        ])
            .then(res => {
                let lRes = res[0],
                    cRes = res[1],
                    uRes = res[2];
                if (uRes.status == 1) {
                    CommonUtil.destoryCheckSessionTimer();
                    localStorage.setItem('currentUserInfo', JSON.stringify({
                        userName: null
                    }));
                };
                this.setState({
                    messages: this.convert('leavemessage')(lRes.data.list),
                    comments: this.convert('comment')(cRes.data.list),
                    loginType: uRes.status == 0 ? LoginType.LoginSuccessfully : LoginType.Default,
                    displayUserName: CommonUtil.getCurrentUser()
                });
                $$.loading(false);
            })
            .catch(e => {
                $$.loading(false);
                $$.conform({
                    message: e,
                    status: "show"
                });
            });
    }

    retrieveNewComment() {
        return new Promise((resolve, reject) => {
            let data = {
                limit: 5,
                offset: 1
            };
            let option = {
                url: `./api/article/getComments`,
                method: "POST",
                data: data
            };
            fetchUtility(option)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                });
        })
    }

    retrieveLeaveMessage() {
        return new Promise((resolve, reject) => {
            let data = {
                limit: 5,
                offset: 1
            };
            let option = {
                url: `./api/leavemessage/getLeaveMessage`,
                method: "POST",
                data: data
            };
            fetchUtility(option)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                });
        })
    }

    getCurrentUserInfo() {
        return new Promise((resolve, reject) => {
            let option = {
                url: `./api/user/userInfo`,
                method: "GET"
            };
            fetchUtility(option)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                });
        })
    }

    convert(type) {
        let clr = {
            comment: function (list) {
                return list.map(l => {
                    return {
                        message: l.content,
                        author: l.author,
                        time: l.time,
                        articleTitle: l.articleTitle
                    }
                });
            },
            leavemessage: function (list) {
                return list.map(l => {
                    return {
                        message: l.content,
                        author: l.author,
                        time: l.time
                    }
                })
            }
        };
        return clr[type];
    }

    renderLeaveMessage() {
        return this.state.messages.map((m, index) => {
            return (
                <li key={index}>
                    <div>{m.message}</div>
                    <div>----{m.author}</div>
                    <div className="clear-both" />
                </li>
            );
        });
    }

    renderNewComment() {
        return this.state.comments.map((m, index) => {
            return (
                <li key={index}>
                    <div>{m.message}</div>
                    <div>----{m.author}</div>
                    <div className="clear-both" />
                </li>
            );
        });
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
        let data = {
            username: this.state.userName,
            password: this.state.password
        }, option = {
            url: "./api/user/login",
            method: "POST",
            data: data
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                $$.loading(false);
                if (res.data.status == 0) {
                    localStorage.setItem('currentUserInfo', JSON.stringify({
                        userName: res.data.username
                    }));
                    CommonUtil.createCheckSessionTimer();
                    this.setState({
                        loginType: LoginType.LoginSuccessfully,
                        displayUserName: CommonUtil.getCurrentUser()
                    })
                }
                else {
                    $$.conform({
                        message: 'Login failed.',
                        status: "show"
                    });
                }
            })
            .catch(e => {
                $$.loading(false);
                $$.conform({
                    message: e,
                    status: "show"
                });
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

    handleLogout() {
        let option = {
            url: "./api/user/logout",
            method: "GET"
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                $$.loading(false);
                localStorage.setItem('currentUserInfo', JSON.stringify({
                    userName: null
                }));
                CommonUtil.destoryCheckSessionTimer();
                this.setState({
                    loginType: LoginType.Default
                });
            })
            .catch(e => {
                $$.loading(false);
                $$.conform({
                    message: e,
                    status: "show"
                });
            });
    }

    renderLoginComponent() {
        switch (this.state.loginType) {
            case LoginType.Login:
                return <React.Fragment>
                    <div className="margin-bottom-10 margin-top-10">
                        <label>账号：</label>
                        <input
                            type="text"
                            value={this.state.number}
                            onChange={this.handleUserNameChanged}
                        />
                    </div>
                    <div className="margin-bottom-10">
                        <label>密码：</label>
                        <input
                            type="text"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </div>
                    <div className="btn-group">
                        <RButton text="登录" onClick={this.loginHandler} />
                        <RButton
                            text="返回"
                            onClick={this.changeLogin.bind(this, LoginType.Default)}
                        />
                    </div>
                </React.Fragment>
            case LoginType.LoginSuccessfully:
                return <div className='display-userInfo'>
                    <div>
                        <label>当前用户:</label>
                        {this.state.displayUserName}
                    </div>
                    <div>
                        <RButton text="注销" onClick={this.handleLogout.bind(this)} />
                    </div>
                </div>
            case LoginType.Register:
                return <React.Fragment>
                    <div className="margin-bottom-10 margin-top-10">
                        <label>账号：</label>
                        <input
                            type="text"
                            value={this.state.number}
                            onChange={this.handleUserNameChanged}
                        />
                    </div>
                    <div className="margin-bottom-10">
                        <label>密码：</label>
                        <input
                            type="text"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </div>
                    <div className="btn-group">
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
                        <div className="btn-group">
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="登录" onClick={this.changeLogin.bind(this, LoginType.Login)} />
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="注册" onClick={this.changeLogin.bind(this, LoginType.Register)} />
                            <RButton style={{ padding: '25px', borderRadius: '30px' }} text="返回" onClick={this.changeLogin.bind(this, LoginType.Default)} />
                        </div>
                    </React.Fragment>
                );
            case LoginType.GitHub:
                return (
                    <React.Fragment>
                        <div className="margin-bottom-10 margin-top-10">
                            <label>账号：</label>
                            <input
                                type="text"
                                value={this.state.number}
                                onChange={this.handleNumberChanged}
                            />
                        </div>
                        <div className="margin-bottom-10">
                            <label>密码：</label>
                            <input
                                type="text"
                                value={this.state.password}
                                onChange={this.handlePasswordChanged}
                            />
                        </div>
                        <RButton text="登录" style={{ marginLeft: "5px" }} />
                    </React.Fragment>
                );
            case LoginType.RegisterSuccessfully:
                return <div className='register-successfully'>
                    <div>
                        Register Successfully!
                    </div>
                    <div>
                        <RButton text="登录" onClick={this.changeLogin.bind(this, LoginType.Login)} />
                    </div>
                </div>
            case LoginType.LoginTimeout:
                return <div className='login-timeout'>
                    <div>
                        登录超时！
                    </div>
                    <div>
                        <RButton text="登录" onClick={this.changeLogin.bind(this, LoginType.Login)} />
                    </div>
                </div>
            case LoginType.Default:
                return (
                    <div className="login-content">
                        <div
                            className="login-item"
                            onClick={this.changeLogin.bind(this, LoginType.Account)}
                        >
                            <img
                                className="login-item-icon"
                                src={require("./Image/login-account.png")}
                            />
                            <div className="login-item-font">账号登录</div>
                        </div>
                        <div
                            className="login-item"
                            onClick={this.changeLogin.bind(this, LoginType.GitHub)}
                        >
                            <img
                                className="login-item-icon"
                                src={require("./Image/login-github.png")}
                            />
                            <div className="login-item-font">GitHub登录</div>
                        </div>
                    </div>
                );
        }
    }

    changeLogin(type) {
        this.setState({
            loginType: type
        });
    }

    render() {
        return (
            <div className="summary">
                <section className="login">
                    <h3>登录方式</h3>
                    <div className="padding-5">{this.renderLoginComponent()}</div>
                </section>
                <section>
                    <h3>快速搜索</h3>
                    <div className="padding-5">
                        <input
                            style={{ width: "100%" }}
                            className="margin-bottom-10 margin-top-10"
                            type="text"
                            placeholder="文章标题"
                        />
                        <RButton style={{ float: "right" }} text="搜索" />
                        <div className="clear-both" />
                    </div>
                </section>
                <section className="about-me">
                    <h3>关于我</h3>
                    <div className="padding-5">
                        <p>姓名：韩德琦</p>
                        <p>年龄：27岁</p>
                        <p>地点：大连市</p>
                        <p>职务：Web前端开发</p>
                        <p>自我简介：人丑嘴不甜，长的磕碜还没钱。PS：我就是个切页面的！</p>
                        <div className="know-more">了解更多</div>
                        <ul>
                            <li>
                                <a href="https://github.com/Dqhan" target="_blank">
                                    <span
                                        title="GitHub"
                                        style={{
                                            backgroundImage: `url(${require("./Image/more-git.png")})`
                                        }}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.cnblogs.com/moran1992/" target="_blank">
                                    <span
                                        title="博客园"
                                        style={{
                                            backgroundImage: `url(${require("./Image/more-blog.png")})`
                                        }}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.dqhanhouse.com" target="_blank">
                                    <span
                                        title="分享"
                                        style={{
                                            backgroundImage: `url(${require("./Image/more-share.png")})`
                                        }}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <h3>标签集</h3>
                    <div className="padding-5">
                        <div className="tags">
                            <span style={{ background: "#FF0000" }}>Html5</span>
                            <span style={{ background: "#33FF00" }}>JavaScript</span>
                            <span style={{ background: "#FF66FF" }}>Css3</span>
                            <span style={{ background: "#FF9900" }}>React</span>
                            <span style={{ background: "#00FFFF" }}>MongoDB</span>
                            <span style={{ background: "#CC66FF" }}>Node</span>
                            <span style={{ background: "#0000FF" }}>前端构建</span>
                            <span style={{ background: "#666666" }}>设计模式</span>
                        </div>
                    </div>
                </section>
                <section className="new-comments">
                    <h3>最新评论</h3>
                    <div className="padding-5">
                        <ul>{this.renderNewComment()}</ul>
                    </div>
                </section>
                <section className="new-leave-message">
                    <h3>最新留言</h3>
                    <div className="padding-5">
                        <ul>{this.renderLeaveMessage()}</ul>
                    </div>
                </section>
            </div>
        );
    }
}
