export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [
                'javascript',
                '设计模式'
            ]
        }
        this.initBind();
    }

    initBind() {
    }

    componentWillReceiveProps() {

    }

    componentDidMount() {
        this.initEvent();
    }

    initEvent() {
        function lazyload() {
            let i = 0,
                articles_els = $('.article-item'),
                len = articles_els.length,
                scollTop = document.body.scrollTop || document.documentElement.scrollTop,
                winTop = window.innerHeight;
            for (; i < len; i++) {
                if (articles_els[i].offsetTop < scollTop + winTop) {
                    if (articles_els[i].classList.contains('article-item-visible'))
                        continue;
                    else
                        articles_els[i].classList.add('article-item-visible');
                }
            }
        }
        window.onscroll = CommonUtil.throttle(lazyload, this, 300, 600);
    }

    renderSource() {
        return this.props.source.length > 0 && this.props.source.map((s, index) => {
            return <section className='article-item' key={`section-${index}`}>
                <div>
                    <div className='article-item-title'>
                        {s.title}
                        <i className="light"></i>
                    </div>
                    <div className='article-item-tag'>
                        <div className="article-tag-item fi-page-exam-date-a">
                            {CommonUtil.formatDateTime(new Date(parseInt(s.time)), true)}
                        </div>
                        {this.renderTag()}
                    </div>
                    <p className='article-item-description'>{s.content}</p>
                    <RButton text="Read More" target="_blank" onClick={this.handleArticleLink.bind(this, s.id)}></RButton>
                </div>
                <hr></hr>
            </section>
        })
    }

    renderTag() {
        return this.state.tags.map((t, index) => {
            return <div key={`tag-${index}`} className='article-tag-item fi-page-edit-a'>
                {t}
            </div>
        })
    }

    handleArticleLink(id) {
        let path = `#/sub/article?id=${id}`;
        window.open(path);
    }

    render() {
        return <div className='article'>
            {this.renderSource()}
        </div>
    }
}