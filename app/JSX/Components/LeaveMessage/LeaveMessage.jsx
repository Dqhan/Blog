require('./style/LeaveMessage.less');
import Layout from '../../../Layouts/Layout';

var err = [
    'handleCommitClick',
    'handleCommitChanged',
    'pagerChangedHandler'
];

export default class LeaveMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [],
            commit: "",
            pageSize: 5,
            selectedPage: 1,
            pageCount: 0
        };
        err.forEach(e => {
            this[e] = this[e].bind(this);
        })
    }

    componentDidMount() {
        this.retrieveLeaveMessage();
    }

    retrieveLeaveMessage() {
        $$.loading(true);
        let data = {
            limit: this.state.pageSize,
            offset: this.state.selectedPage
        };
        let option = {
            url: `./api/leavemessage/getLeaveMessage`,
            method: "POST",
            data: data
        };
        fetchUtility(option)
            .then(res => {
                this.setState({
                    source: res.data.list,
                    pageCount: Math.ceil(res.data.total / this.state.pageSize)
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
            author: CommonUtil.getCurrentUser(),
            time: new Date().getTime()
        };
        let option = {
            url: `./api/leavemessage/addLeaveMessage`,
            method: "POST",
            data: data
        };
        fetchUtility(option)
            .then(res => {
                this.setState({
                    commit: ""
                });
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
        return this.state.source.map((s, index) => {
            return <div key={'leavemessage-item-' + index} className='leavemessage-content-item'>
                <p className='leavemessage-content-item-content'>{s.content}</p>
                <div className='float-right'>
                    <div className='leavemessage-content-item-author'>----{s.author}</div>
                    <div>{s.time ? CommonUtil.formatDateTime(new Date(parseInt(s.time)), true) : new Date()}</div>
                </div>
            </div>
        })
    }

    handleCommitChanged(e) {
        this.setState({
            commit: e.target.value
        })
    }

    pagerChangedHandler(e, args) {
        this.setState({
            selectedPage: args.newValue
        }, () => {
            this.retrieveLeaveMessage();
        })
    }

    render() {
        return <React.Fragment>
            <Layout
                history={this.props.history}
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
                    <div className='leavemessage-pager'>
                        <$$.Pager
                            pageSize={this.state.pageSize}
                            pageCount={this.state.pageCount}
                            selectedPage={this.state.selectedPage}
                            selectedPageChanged={this.pagerChangedHandler}
                        />
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