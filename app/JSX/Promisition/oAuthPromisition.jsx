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
            data = {
                code: this.code,
                clientId: client_id,
                clientSecret: client_secret
            },
            option = {
                url: '/api/oauth/oAuthValidate',
                method: "POST",
                data: data
            };
        fetchUtility(option)
            .then(res => {
                localStorage.setItem('github_api_oauth_token', res.data.accessToken);
                localStorage.setItem('github_api_oauth_profile_info', JSON.stringify(res.data.profileInfo));
                // this.props.history.goBack();
                this.props.history.push('/');
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