export default class Blog extends React.Component {
    constructor(props) {
        var a = require.context('../../style/', true, /\.less$/);
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
        let args = Array.prototype.slice.call(arguments);
        let request = {
            tags: []
        };
        if (args.length > 0) {
            args.forEach(a => {
                request.tags.push(a);
            })
        };
        let option = {
            url: `./blog/api/getartciles`,
            method: 'POST',
            body: request
        };
        fetchUtility(option).then(res => {
            this.setState({
                blogs: this.convert(res.result.source)
            });
            $$.loading(false);
        }).catch(e => {
            $$.loading(false);
            console.log(e);
        })
    }

    convert(res) {
        let arr = [];
        res.forEach(r => {
            var temp = {
                id: r.article_id,
                title: r.title.replace(/[# ]/g, ''),
                time: r.time,
                author: r.author,
                viewCount: r.view_count,
                content: r.content.replace(/[# ]/g, ''),
                tags: r.tags
            }
            arr.push(temp);
        })
        return arr;
    }

    handleWriteBlog() {
        this.props.history.push('/blog/write');
    }

    handleClassifyClick(e) {
        let clr = {
            "Javascript": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Javascript),
            "React": this.retrieveBlogs.bind(this, Util.TAG_TYPE.React),
            "Node": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Node),
            "Typescript": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Typescript),
            // "Es6": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Es6),
            "Webpack": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Webpack),
            "设计模式": this.retrieveBlogs.bind(this, Util.TAG_TYPE.SJModule),
            "Web": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Web)
        };
        clr[e.target.textContent]();
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
            <R.Layout {...layoutProps} >
                <div className='blog'>
                    <div className='classify' onClick={this.handleClassifyClick}>
                        <article>Javascript</article>
                        <article>Typescript</article>
                        {/* <article>Es6</article> */}
                        <article>React</article>
                        <article>Node</article>
                        <article>Webpack</article>
                        <article>设计模式</article>
                        <article>Web</article>
                    </div>
                    <R.Content {...contentProps} />
                    <div style={{ textAlign: ' center' }}>
                        <RButton text="写博客" style={{ width: '200px' }} onClick={this.handleWriteBlog}></RButton>
                    </div>
                </div>
            </R.Layout>
            <More />
        </React.Fragment>
    }
}



class More extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true
        }
    }

    componentWillMount() {
    }

    handleChangeStatus() {
        this.setState({
            status: !this.state.status
        })
    }

    render() {
        return <div className='know-more'>
            <div className={this.state.status ? 'know-more-body' : 'know-more-body active'}>
                <div className='know-more-btn' onClick={this.handleChangeStatus.bind(this)}>
                    <div className={this.state.status ? 'fi-page-arrow-left-double-as' : 'fi-page-arrow-right-double-as'}></div>
                </div>
                <div className='know-more-content'>
                    <div className='know-more-content-blog-pic'></div>
                    <div className='know-more-content-blog-desc'>感谢打赏,您的肯定是对我最大的帮助！</div>
                </div>
            </div>
        </div>
    }
}