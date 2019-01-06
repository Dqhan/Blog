require('./style/article.less');
import React from 'react';
import Layout from '../../../Layouts/Layout';
import MarkDown from '../../AUI/MarkDown';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            content: ""
        }
        return this;
    }

    initBind() {
        this.retrieveArticleCallback = this.retrieveArticleCallback.bind(this);
    }

    componentDidMount() {
        this.retrieveArticle(this.retrieveArticleCallback);
    }

    retrieveArticle() {
        
    }

    retrieveArticleCallback(res) {
        this.state.content = res;
        this.setState(this.state)
    }

    render() {
        return <React.Fragment>
            <Layout
                hasHeader={true}
                hasModuleLogo={true}
                logo={"文章"}
            >
                <div className='article'>
                    <div className='article-header'>
                        <img src={require('../../../Image/blogHeader.jpg')} />
                    </div>
                    <MarkDown
                        content={this.state.content}
                    />
                </div>
            </Layout>
        </React.Fragment>
    }
}