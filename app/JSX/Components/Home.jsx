import Layout from '../../Layouts/Layout';
import Header from './Header';
import Content from './Content/Content';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            blogs: [],
            headerScrolled: false
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
            this.setState(this.state, () => {
                $$.loading(false);
            });
        }).catch(e => {
            $$.loading(false);
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
                comments: r.comments,
                content: r.content.replace(/[# ]/, '')
            }
            arr.push(temp);
        })
        return arr;
    }

    render() {
        var contentProps = {
            module: 'blog',
            history: this.props.history,
            source: this.state.blogs,
            history: this.props.history
        }
        return <div>
            <Header isHome={true} />
            <$$.Banner
                bannerList={[
                    {
                        leftText: "成熟的人",
                        rightText: "谦虚、低调、柔和"
                    },
                    {
                        leftText: "为人处世",
                        rightText: "真诚、善良、正直"
                    },
                    {
                        leftText: "不忘初心",
                        rightText: "方得始终"
                    }
                ]}
            />
            <Layout isHome={true}>
                <Content {...contentProps} />
            </Layout>
        </div>
    }
}