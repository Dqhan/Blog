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
        let request = {
            tags: []
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

    render() {
        var contentProps = {
            history: this.props.history,
            source: this.state.blogs
        }
        return <div>
            <Header isHome={true} />
            <$$.Banner
                bannerList={[
                    { leftText: "成熟的人", rightText: "谦虚、低调、柔和" },
                    { leftText: "为人处世", rightText: "真诚、善良、正直" },
                    { leftText: "不忘初心", rightText: "方得始终" }
                ]}
            />
            <Layout isHome={true}>
                <Content {...contentProps} />
            </Layout>
        </div>
    }
}