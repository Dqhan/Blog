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
        }
        return this;
    }

    initBind() {

    }

    componentDidMount() {
        this.retrieveArticle();
    }

    retrieveArticle() {

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
                    <MarkDown />
                </div>
            </Layout>
        </React.Fragment>
    }
}