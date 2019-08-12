require('./style/article.less');
import Layout from '../../../Layouts/Layout';
import MarkDown from '../../AUI/MarkDown';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            data: {},
            comments: []
        }
        return this;
    }

    initBind() {
        this.handleCommitChanged = this.handleCommitChanged.bind(this);
        this.handleCommitClick = this.handleCommitClick.bind(this);
    }

    componentDidMount() {
        this.retrieveArticle();
    }

    retrieveArticle() {
        let id = getUrlParamster().id;
        let option = {
            url: `./api/article/getArticleDetail?id=${id}`,
            method: 'GET'
        }
        fetchUtility(option).then(res => {
            this.state.data = res.data;
            this.setState(this.state);
        }).catch(e => {
            console.log(e);
        })
    }

    retrieveComments() {
        let id = getUrlParamster().id;
        let option = {
            url: `./api/article/getComments?id=${id}`,
            method: 'GET'
        }
        fetchUtility(option).then(res => {
            this.setState({
                comments: res.data
            })
        }).catch(e => {
            console.log(e);
        })
    }

    handleCommitChanged(e) {
        this.setState({
            commit: e.target.value
        })
    }


    handleCommitClick() {
        $$.loading(true);
        let id = getUrlParamster().id;
        let data = {
            articleId: id,
            content: this.state.commit,
            author: this.getCurrentUser(),
            time: new Date().getTime()
        };
        let option = {
            url: `./api/article/addComment`,
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

    render() {
        return <React.Fragment>
            <Layout
                hasHeader={true}
                hasModuleLogo={true}
                logo={"文章"}
            >
                <div className='article'>
                    <div className='article-header'>
                        <img src={require('../../../Image/blogHeader.jpg')} />
                    </div>
                    {
                        Object.keys(this.state.data).length != 0 && <MarkDown
                            history={this.props.history}
                            data={this.state.data}
                        />
                    }

                    <div>评论:</div>
                    <div className='article-commit'>
                        <textarea value={this.state.commit} onChange={this.handleCommitChanged}></textarea>
                    </div>
                    <div className='article-btn'>
                        <RButton text="提交" style={{ width: '200px' }} onClick={this.handleCommitClick}></RButton>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}