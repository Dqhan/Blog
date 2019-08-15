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
            title: '',
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
        this.retrieveComments();
    }

    retrieveArticle() {
        let id = getUrlParamster().id;
        let option = {
            url: `./api/article/getArticleDetail?id=${id}`,
            method: 'GET'
        }
        $$.loading(true);
        fetchUtility(option).then(res => {
            this.setState({
                data: res.data,
                title: res.data.title
            }, () => {
                $$.loading(false);
            });
        }).catch(e => {
            $$.loading(false);
            $$.conform({
                message: e,
                status: "show"
            });
        })
    }

    retrieveComments() {
        let id = getUrlParamster().id;
        let data = {
            articleId: id
        }
        let option = {
            url: `./api/article/getCommentsbyArticleId`,
            method: 'POST',
            data: data
        }
        $$.loading(true);
        fetchUtility(option).then(res => {
            this.setState({
                comments: res.data.list
            }, () => {
                $$.loading(false);
            })
        }).catch(e => {
            $$.loading(false);
            $$.conform({
                message: e,
                status: "show"
            });
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
            author: CommonUtil.getCurrentUser(),
            time: new Date().getTime(),
            articleTitle: this.state.title,
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
                    this.retrieveComments();
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

    renderComments() {
        return this.state.comments.map((s, index) => {
            return <div key={'comment-item-' + index} className='comment-content-item'>
                <p className='comment-content-item-content'>{s.content}</p>
                <div className='float-right'>
                    <div className='comment-content-item-author'>----{s.author}</div>
                    <div>{s.time ? CommonUtil.formatDateTime(new Date(parseInt(s.time)), true) : new Date()}</div>
                </div>
            </div>
        })
    }

    render() {
        return <React.Fragment>
            <Layout
                history={this.props.history}
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
                    <div className='comment-content'>
                        {
                            this.renderComments()
                        }
                    </div>
                    <div>评论:</div>
                    <div className='article-commit'>
                        <textarea value={this.state.commit} onChange={this.handleCommitChanged}></textarea>
                    </div>
                    <div className='article-btn'>
                        <RButton text="提交" style={{ width: '200px' }} onClick={this.handleCommitClick}></RButton>
                    </div>
                </div>
            </Layout>
        </React.Fragment >
    }
}