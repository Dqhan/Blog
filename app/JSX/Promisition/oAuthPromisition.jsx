export default class oAuthPromisition extends React.Component {
    constructor(props) {
        super(props);
        this.clientId = "5f2b3eb585cd289ca088";
        this.clientSecret = "281abd4850f451b536416ddede3e3a61ccce07fe";
    }

    componentDidMount() {
        this.getGitHubCode();
    }

    getGitHubCode() {
        let { code } = CommonUtil.getUrlParamseter();
        this.code = code;
        this.getAccessToken();
    }

    getAccessToken() {
        let { client_id, client_secret } = CommonUtil.Config.github,
            body = {
                code: this.code,
                clientId: client_id,
                clientSecret: client_secret
            },
            option = {
                url: '/api/oauth/getgithubtoken',
                method: "POST",
                body: body
            };
        fetchUtility(option)
            .then(res => {
                if(res.status === 1){
                    location.href = "https://github.com/login/oauth/authorize?response_type=code&redirect_uri=https%3A//www.dqhanblog.cn/%23/oAuthPromisition&scope=user%2Crepo&client_id=5f2b3eb585cd289ca088"
                }else{
                    localStorage.setItem('access_token', res.result.accessToken);
                    localStorage.setItem('profile_info', JSON.stringify(res.result.profileInfo));
                    localStorage.setItem('login_type', Util.LOGIN_TYPE.GitHub);
                    location.href = `https://${CommonUtil.Config.HOST}`;
                }
            })
            .catch(e => {
                $$.conform({
                    message: e,
                    status: "show"
                });
            });
    }

    render() {
        return <div></div>
    }
}