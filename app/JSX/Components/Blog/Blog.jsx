require('./style/blog.less');
import Content from '../Content';
import Layout from '../../../Layouts/Layout';
import Editor from '../../AUI/Editor';

const BlogMode = {
    Show: 0,
    Write: 1,
    All: 2
}

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            mode: BlogMode.Show,
            blogs: []
        }
        return this;
    }

    initBind() {

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
            this.state.blogs = this.convert(res.data.list);
            this.setState(this.statem,()=>{
                $$.loading(false);
            });
        }).catch(e => {
            $$.loading(true);
            $$.conform({
                message: e,
                status: 'show'
            });
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

    handleCancelClick() {
        this.setState({
            mode: BlogMode.Show
        }, () => {
            this.retrieveBlogs();
        })
    }

    handleShowAllBlog() {
        this.setState({
            mode: BlogMode.All
        })
    }

    handleWriteBlog() {
        this.setState({
            mode: BlogMode.Write
        })
    }

    render() {
        var contentProps = {
            module: 'blog',
            history: this.props.history,
            source: this.state.blogs
        }
        return <React.Fragment>
            {
                this.state.mode == BlogMode.Show && <Layout
                    hasHeader={true}
                    hasModuleLogo={true}
                    logo={'博客园'}
                >
                    <div className='blog'>
                        <div className='blog-header'>
                            <img src={require('../../../Image/blogHeader.jpg')} />
                        </div>
                        <div className='classify'>
                            <article>Javascript</article>
                            <article>React</article>
                            <article>Node</article>
                            <article>Css</article>
                            <article>工作笔记</article>

                        </div>
                        <Content {...contentProps} />
                        <div style={{ textAlign: ' center' }}>
                            <RButton text="查看更多" style={{ width: '200px', margin: '0 20px' }} onClick={this.handleShowAllBlog.bind(this)}></RButton>
                            <RButton text="写博客" style={{ width: '200px' }} onClick={this.handleWriteBlog.bind(this)}></RButton>
                        </div>
                    </div>
                </Layout>
            }
            {
                this.state.mode == BlogMode.Write && <Editor
                    cancel={this.handleCancelClick.bind(this)}
                />
            }
        </React.Fragment>
    }
}