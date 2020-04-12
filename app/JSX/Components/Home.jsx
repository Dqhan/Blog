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
                blogs: this.convert(res.result.source)
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
                    { leftText: "Webpack", rightText: "你太牛逼啦" },
                    { leftText: "React", rightText: "天下第一" },
                    { leftText: "Nodejs", rightText: "天下第一" }
                ]}
            />
            <Layout isHome={true}>
                <section className='other-link'>
                    <a className='other-link-item' target='_blank' href='https://nap7.com/'>Hendry's Blog</a>
                </section>
                <Content {...contentProps} />
            </Layout>
        </div>
    }
}