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
    }

    componentDidMount() {
        this.retrieveBlogs();
    }

    retrieveBlogs() {
        $$.loading(true);
        let data = {
            limit: 5,
            offset: 1
        }
        let option = {
            url: `./api/article/getArticles`,
            method: 'POST',
            data: data
        }
        fetchUtility(option).then(res => {
            this.setState({
                blogs: this.convert(res.data.list)
            }, () => {
                $$.loading(false);
            });
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
                content: r.content.replace(/[# ]/, '')
            }
            arr.push(temp);
        })
        return arr;
    }

    handleWriteBlog() {
        this.props.history.push('/sub/write');
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
                    <div className='classify'>
                        <article>Javascript</article>
                        <article>React</article>
                        <article>Node</article>
                        <article>Css</article>
                        <article>工作笔记</article>

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