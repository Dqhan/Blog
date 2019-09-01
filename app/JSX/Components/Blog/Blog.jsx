require('./style/blog.less');
import Content from '../Content/Content';
import Layout from '../../../Layouts/Layout';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this
            .initState()
            .initBind();
    }

    initState() {
        this.state = {
            blogs: []
        }
        return this;
    }

    initBind() {
        this.handleWriteBlog = this.handleWriteBlog.bind(this);
        this.handleClassifyClick = this.handleClassifyClick.bind(this);
    }

    componentDidMount() {
        this.retrieveBlogs();
    }

    retrieveBlogs() {
        $$.loading(true);
        let option = {
            url: `./api/article/getArticles`,
            method: 'GET'
        };
        fetchUtility(option).then(res => {
            this.setState({
                blogs: this.convert(res.data.list)
            });
            $$.loading(false);
        }).catch(e => {
            $$.loading(true);
            console.log(e);
        })
    }

    convert(res) {
        let arr = []
        res.forEach(r => {
            var temp = {
                id: r._id,
                title: r.title.replace(/[# ]/g, ''),
                time: r.time,
                author: r.author,
                viewCount: r.viewCount,
                commentCount: r.commentCount,
                content: r.content.replace(/[# ]/, ''),
                tags: r.tags
            }
            arr.push(temp);
        })
        return arr;
    }

    handleWriteBlog() {
        this.props.history.push('/sub/write');
    }

    handleClassifyClick(e) {
        let self = this,
            clr = {
                "Javascript": function () {
                    self.retrieveBlogsByTag("Javascript");
                },
                "React": function () {
                    self.retrieveBlogsByTag("React");
                },
                "Node": function () {
                    self.retrieveBlogsByTag("Node");
                },
                "Css": function () {
                    self.retrieveBlogsByTag("Css");
                },
                "Webpack": function () {
                    self.retrieveBlogsByTag("Webpack");
                },
                "设计模式": function () {
                    self.retrieveBlogsByTag("SJModule");
                },
                "Web知识": function () {
                    self.retrieveBlogsByTag("Web")
                },
            };
        clr[e.target.textContent]();
    }

    retrieveBlogsByTag(tag) {
        let data = {
            tag: tag
        },
            options = {
                url: `./api/article/getArticlesByTag`,
                method: 'POST',
                data: data
            };
        $$.loading(true);
        fetchUtility(options)
            .then(res => {
                this.setState({
                    blogs: this.convert(res.data.list)
                });
                $$.loading(false);
            })
            .catch(e => {
                $$.loading(false);
                console.log(e);
            });
    }

    render() {
        let contentProps = {
            history: this.props.history,
            source: this.state.blogs
        },
            layoutProps = {
                history: this.props.history,
                logo: "博客|Dqhan's Blog"
            };
        return <React.Fragment>
            <Layout {...layoutProps} >
                <div className='blog'>
                    <div className='classify' onClick={this.handleClassifyClick}>
                        <article>Javascript</article>
                        <article>React</article>
                        <article>Node</article>
                        <article>Css</article>
                        <article>Webpack</article>
                        <article>设计模式</article>
                        <article>Web知识</article>
                    </div>
                    <Content {...contentProps} />
                    <div style={{ textAlign: ' center' }}>
                        <RButton text="写博客" style={{ width: '200px' }} onClick={this.handleWriteBlog}></RButton>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}