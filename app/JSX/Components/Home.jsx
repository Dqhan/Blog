import Layout from '../../Layouts/Layout';
import Banner from '../AUI/Banner';
import Header from './Header';
import Content from './Content';

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
        this.initComputed();
        this.retrieveBlogs();
    }

    initComputed() {
        this.initScrollComputed();
    }

    initScrollComputed() {
        var self = this;
        window.addEventListener("scroll", function (e) {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t != 0) {
                self.setState({
                    headerScrolled: true
                })
            } else {
                self.setState({
                    headerScrolled: false
                })
            }
        });
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
            this.setState(this.state,()=>{
                $$.loading(false);
            });
        }).catch(e => {
            $$.loading(false);
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
            <Header headerScrolled={this.state.headerScrolled} />
            <Banner />
            <Layout>
                <Content {...contentProps} />
            </Layout>
        </div>
    }
}