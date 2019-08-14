export default class oAuthPromisition extends React.Component {
    constructor(props) {
        super(props);
        this.getGitHubCode();
        this.clientId = "5f2b3eb585cd289ca088";
        this.clientSecret = "281abd4850f451b536416ddede3e3a61ccce07fe";
    }

    componentDidMount() {
        console.log('e')
    }

    getGitHubCode() {
        let { code } = CommonUtil.getUrlParamseter();
        this.code = code;
        this.getAccessToken();
    }

    getAccessToken() {
        let url = `https://github.com/login/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${this.code}`;

        let data = {
            code: this.code,
            clientId: this.clientId,
            clientSecret: this.clientSecret
        }
        let option = {
            url: '/oauth/oAuthValidate',
            method: "POST",
            data: data
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                var a = res;
            })
            .catch(e => {
                $$.conform({
                    message: e,
                    status: "show"
                });
            });
    }

    getAccessTokenUserInfo() {
        let url = `https://api.github.com/user?access_token=xxxxxxxxxxxxxxxxx`;
    }

    render() {
        return <div></div>
    }
}