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
        return this.state.tags.map(t => {
            return <div className='article-tag-item fi-page-edit-a'>
                {t}
            </div>
        })
    }

    handleArticleLink(id) {
        let path = '';
        switch (this.props.module) {
            case 'blog':
                path = `#/sub/article?id=${id}`;
                break;
            case 'production':
                path = `#/sub/production?id=${id}`;
                break;
        }
        window.open(path);
    }

    render() {
        return <div className='article'>
            {this.renderSource()}
        </div>
    }
}