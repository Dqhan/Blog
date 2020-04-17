export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState() {
        this.state = {
            blogs: [],
            headerScrolled: false
        }
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
        return <R.Layout isHome={true}>
            <section className='other-link'>
                <a className='other-link-item' target='_blank' href='https://nap7.com/'>Hendry's Blog</a>
            </section>
            <R.Content {...contentProps} />
        </R.Layout>
    }
}