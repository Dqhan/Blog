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
        let data = {
            code: this.code,
            clientId: this.clientId,
            clientSecret: this.clientSecret
        }
        let option = {
            url: '/api/oauth/oAuthValidate',
            method: "POST",
            data: data
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                localStorage.setItem('githubToken', JSON.stringify({
                    name: res.data.name,
                    location: res.data.location,

                }));
                this.gitHubLogin();
                this.props.history.goBack();
            })
            .catch(e => {
                $$.conform({
                    message: e,
                    status: "show"
                });
            });
    }

    gitHubLogin() {
        let data = {
            code: this.code,
            clientId: this.clientId,
            clientSecret: this.clientSecret
        }
        let option = {
            url: '/api/oauth/loginGitHub',
            method: "POST",
            data: data
        };
        $$.loading(true);
        fetchUtility(option)
            .then(res => {
                localStorage.setItem('githubToken', JSON.stringify({
                    name: res.data.name,
                    location: res.data.location,

                }));
                this.gitHubLogin();
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