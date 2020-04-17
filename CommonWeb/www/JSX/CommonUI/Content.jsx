class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [
            ]
        }
        this.initBind();
    }

    initBind() {
    }


    componentDidMount() {
        this.initEvent();
    }

    componentDidUpdate() {
        this.lazyload();
    }

    initEvent() {
        window.onscroll = CommonUtil.throttle(this.lazyload, this, 300, 600);
    }

    lazyload() {
        let i = 0,
            articles_els = $('.article-item'),
            len = articles_els.length;
        for (; i < len; i++) {
            if (this.isShow($(articles_els[i]))) this.loadSection(articles_els[i]);
        }
    }

    isShow($node) {
        return $node.offset().top <= $(window).height() + $(window).scrollTop();
    }

    loadSection(article_el) {
        article_el.classList.add('article-item-visible');
    }

    limitContent(content) {
        return content.substr(0, 400) + '...';
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
                        {this.renderTag(s.tags)}
                    </div>
                    <p className='article-item-description'>{this.limitContent(s.content)}</p>
                    <RButton text="Read More" target="_blank" onClick={this.handleArticleLink.bind(this, s.id)}></RButton>
                </div>
                <hr></hr>
            </section>
        })
    }

    renderTag(tags) {
        return tags.map((t, index) => {
            return <div key={`tag-${index}`} className='article-tag-item fi-page-edit-a'>
                {Util.assembleTagItem(t)}
            </div>
        })
    }

    handleArticleLink(id) {
        let path = `#/blog/article?id=${id}`;
        window.open(path);
    }

    render() {
        return <div className='article'>
            {this.renderSource()}
        </div>
    }
}
window.R.Content = Content;