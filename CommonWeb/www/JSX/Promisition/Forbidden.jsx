import LoginDialog from "../CommonUI/LoginDialog";
export default class Forbidden extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            dialogStatus: false
        };
        return this;
    }

    initBind() {
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCloseLoginDialogCallback = this.handleCloseLoginDialogCallback.bind(this);
    }

    handleLogin() {
        this.setState({
            dialogStatus: true
        })
    }

    handleCloseLoginDialogCallback() {
        this.setState({
            dialogStatus: false
        })
    }

    render() {
        return <div className='forbidden'>
            <div className='forbidden-font-logo'>403 Forbidden</div>
            <img src='https://www.dqhanblog.cn:4335/content/403.png'></img>
            <div className="fonbidden-btn">
                <RButton text="Login" onClick={this.handleLogin} />
            </div>

            {
                this.state.dialogStatus && <LoginDialog handleCloseLoginDialogCallback={this.handleCloseLoginDialogCallback} />
            }
        </div>
    }
}