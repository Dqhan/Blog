export default class WeChatPromisitionCheck extends React.Component {
    constructor(props) {
        super(props);
        this.appId = "wx65df7a4974221854";
        this.appsecert = "a6d91061f93dafc1c44dffe794bf48b9";
    }

    componentDidMount() {
        this.getCode();
    }

    getCode() {
        let { code } = CommonUtil.getUrlParamseter();
        this.code = code;
        this.getAccessToken();
    }

    getAccessToken() {
        let { clientId, clientSecret, code } = this,
            url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
            option = {
                method: "GET",
                mode: "cors",
            };
        fetch(url, option)
            .then(res => {
                return res.json();
            })
            .then(res => {
                var a = res;
            })
            .catch(e => {
                $$.conform({
                    message: e,
                    status: "show"
                });
            })
    }

    // getAccessToken() {
    //     let data = {
    //         code: this.code,
    //         clientId: this.clientId,
    //         clientSecret: this.clientSecret
    //     }
    //     let option = {
    //         url: '/api/oauth/oAuthValidate',
    //         method: "POST",
    //         data: data
    //     };
    //     $$.loading(true);
    //     fetchUtility(option)
    //         .then(res => {
    //             localStorage.setItem('githubToken', JSON.stringify({
    //                 name: res.data.name,
    //                 location: res.data.location,

    //             }));
    //             this.gitHubLogin();
    //             this.props.history.goBack();
    //         })
    //         .catch(e => {
    //             $$.conform({
    //                 message: e,
    //                 status: "show"
    //             });
    //         });
    // }

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