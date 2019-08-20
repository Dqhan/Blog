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

    // getAccessToken() {
    //     let { clientId, clientSecret, code } = this,
    //         url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    //         option = {
    //             method: "GET",
    //             mode: "cors",
    //         };
    //     fetch(url, option)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(res => {
    //             var a = res;
    //         })
    //         .catch(e => {
    //             $$.conform({
    //                 message: e,
    //                 status: "show"
    //             });
    //         })
    // }

    getAccessToken() {
        let data = {
            code: this.code,
            clientId: this.clientId,
            clientSecret: this.clientSecret
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
                this.props.history.goBack();
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