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
            url: `./api/article/getartciles`,
            method: 'POST',
            body: request
        };
        fetchUtility(option).then(res => {
            this.setState({
                blogs: this.convert(res.result)
            });
            $$.loading(false);
        }).catch(e => {
            $$.loading(false);
            console.log(e);
        })
    }

    convert(res) {
        let arr = []
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
        this.props.history.push('/sub/write');
    }

    handleClassifyClick(e) {
        let clr = {
            "Javascript": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Javascript),
            "React": this.retrieveBlogs.bind(this, Util.TAG_TYPE.React),
            "Node": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Node),
            "Typescript": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Typescript),
            "Es6": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Es6),
            "Webpack": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Webpack),
            "设计模式": this.retrieveBlogs.bind(this, Util.TAG_TYPE.SJModule),
            "Web知识体系": this.retrieveBlogs.bind(this, Util.TAG_TYPE.Web)
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
            <Layout {...layoutProps} >
                <div className='blog'>
                    <div className='classify' onClick={this.handleClassifyClick}>
                        <article>Javascript</article>
                        <article>Typescript</article>
                        <article>Es6</article>
                        <article>React</article>
                        <article>Node</article>
                        <article>Webpack</article>
                        <article>设计模式</article>
                        <article>Web知识体系</article>
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