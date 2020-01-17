require('./style/article.less');
import Layout from '../../../Layouts/Layout';
import MarkDown from '../../AUI/MarkDown';
import { resolve, reject } from 'q';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            markdown: {
                title: '',
                content: ''
            },
            comments: [],
            hasMount: false
        }
        return this;
    }

    initBind() {
        this.handleCommitChanged = this.handleCommitChanged.bind(this);
        this.handleCommitClick = this.handleCommitClick.bind(this);
    }

    componentDidMount() {
        let promiseArray = [
            new Promise((resolve, reject) => { this.retrieveArticles(resolve, reject) }),
            new Promise((resolve, reject) => { this.retrieveDelivers(resolve, reject) })
        ];
        Promise.all(promiseArray)
            .then(res => {
                if (res[0]) this.retrieveArticlesCallback(res[0]);
                if (res[1]) this.retrieveDeliversCallback(res[1]);
            })
            .catch(e => {
                throw new Error(e);
            });
    }

    retrieveArticles(resolve, reject) {
        let id = getUrlParamster().id;
        let option = {
            url: `./api/article/getartcile?id=${id}`,
            method: 'GET'
        }
        $$.loading(true);
        fetchUtility(option).then(res => {
            $$.loading(false);
            if (toString.call(resolve) === '[object Function]') resolve(res);
            else this.retrieveArticlesCallback(res);
        }).catch(e => {
            $$.loading(false);
            if (toString.call(reject) === '[object Function]') reject(e);
            else throw new Error(e);
        })


        // var myHeaders = new Headers();
        // myHeaders.append('Content-Type','application/x-www-form-urlencoded');
        // myHeaders.append('','');
        // var myInit = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     mode: 'cors',
        //     cache: 'default'
        // };
        // var myRequest = new Request(`./api/article/getartcile?id=${id}`, myInit);
        // myRequest.then(res => {
        //     $$.loading(false);
        //     if (toString.call(resolve) === '[object Function]') resolve(res);
        //     else this.retrieveArticlesCallback(res);
        // }).catch(e => {
        //     $$.loading(false);
        //     if (toString.call(reject) === '[object Function]') reject(e);
        //     else throw new Error(e);
        // })
    }

    retrieveArticlesCallback(res) {
        let result = res.result[0];
        this.setState(Object.assign(this.state, {
            markdown: {
                content: result.content,
                title: result.title
            },
            hasMount: true
        }));
    }

    retrieveDelivers(resolve, reject) {
        let id = getUrlParamster().id;
        let option = {
            url: `./api/deliver/getdelivers?id=${id}`,
            method: 'GET'
        }
        $$.loading(true);
        fetchUtility(option).then(res => {
            $$.loading(false);
            if (toString.call(resolve) === '[object Function]') resolve(res);
            else this.retrieveDeliversCallback(res);
        }).catch(e => {
            $$.loading(false);
            if (toString.call(reject) === '[object Function]') reject(e);
            else throw new Error(e);
        })
    }

    retrieveDeliversCallback(res) {
        let result = res.result;
        this.setState(Object.assign(this.state, {
            comments: result
        }))
    }

    handleCommitChanged(e) {
        this.setState({
            commit: e.target.value
        })
    }


    handleCommitClick() {
        $$.loading(true);
        let id = getUrlParamster().id;
        let request = {
            article_id: id,
            article_title: this.state.markdown.title,
            content: this.state.commit,
            author: CommonUtil.getCurrentUser(),
            time: new Date().getTime()
        };
        let option = {
            url: `./api/deliver/adddeliver`,
            method: "POST",
            body: request
        };
        fetchUtility(option)
            .then(res => {
                this.setState({
                    commit: ""
                }, () => {
                    this.retrieveDelivers();
                });
                $$.loading(false);
            })
            .catch(e => {
                $$.loading(false);
                console.log(e);
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
                logo="文章|Dqhan's Blog"
            >
                <div className='article'>
                    {
                        this.state.hasMount && <MarkDown
                            history={this.props.history}
                            markdown={this.state.markdown}
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