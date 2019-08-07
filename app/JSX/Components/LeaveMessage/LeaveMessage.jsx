require('./style/LeaveMessage.less');
import Layout from '../../../Layouts/Layout';

export default class LeaveMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [],
            commit: "",
            author: ""
        };
        this.handleCommitClick = this.handleCommitClick.bind(this);
        this.handleCommitChanged = this.handleCommitChanged.bind(this);
    }

    componentDidMount() {
        this.retrieveLeaveMessage();
    }

    retrieveLeaveMessage() {
        $$.loading(true);
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
                this.setState({
                    source: res.data.list
                })
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


    handleCommitClick() {
        $$.loading(true);
        let data = {
            content: this.state.commit,
            author: this.state.author,
            time: new Date().getTime()
        };
        let option = {
            url: `./api/leavemessage/addLeaveMessage`,
            method: "POST",
            data: data
        };
        fetchUtility(option)
            .then(res => {
                console.log(res);
                if (res) {
                    this.retrieveLeaveMessage();
                } else {
                    $$.conform({
                        message: 'Commit Error.',
                        status: "show"
                    });
                }
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

    renderLeaveMessage() {
        return this.state.source.map(s => {
            return <div className='leavemessage-content-item'>
                <div>{s.content}</div>
                <div className='float-right'>
                    <div>----{s.author}</div>
                    <div>{s.time ? window.CommonUtil.formatDateTime(new Date(s.time),true) : new Date()}</div>
                </div>
            </div>
        })
    }

    handleCommitChanged(e) {
        this.setState({
            commit: e.target.value
        })
    }

    render() {
        return <React.Fragment>
            <Layout
                hasHeader={true}
                hasModuleLogo={true}
                logo={'留言板'}
            >
                <div className='leavemessage'>
                    <div className='leavemessage-header'>
                        <img src={require('../../../Image/workHeader.jpg')} />
                    </div>
                    <div className='leavemessage-content'>
                        {
                            this.state.source.length !== 0 && this.renderLeaveMessage()
                        }
                    </div>
                    <div className='leavemessage-commit'>
                        <textarea value={this.state.commit} onChange={this.handleCommitChanged}></textarea>
                    </div>
                    <div className='leavemessage-btn'>
                        <RButton text="提交" style={{ width: '200px' }} onClick={this.handleCommitClick}></RButton>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}