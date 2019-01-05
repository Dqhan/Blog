import React from 'react';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.initBind();
    }

    initBind() {
    }

    renderSource() {
        return this.props.source.length > 0 && this.props.source.map((s, index) => {
            return <section className='section-item' key={`section-${index}`}>
                <div>
                    <img src={require('../../Image/SectionImage/1.jpg')} />
                </div>
                <div>
                    <h3 className='section-item-title'>{s.title}</h3>
                    <p className='section-item-description'>{s.description}</p>
                    <RButton text="Read More" onClick={this.handleArticleLink.bind(this, s.id)}></RButton>
                </div>
            </section>
        })
    }

    handleArticleLink(id) {
        let path = `/sub/article?id=${id}`;
        this.props.history.push(path);
    }

    render() {
        return <React.Fragment>
            <div className='sections inline-block'>
                <div className='sections-content-title'>
                    <h2>最新动态</h2>
                </div>
                {this.renderSource()}
            </div>
        </React.Fragment>
    }
}