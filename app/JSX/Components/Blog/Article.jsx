require('./style/article.less');
import Layout from '../../../Layouts/Layout';
import MarkDown from '../../AUI/MarkDown';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            data: {}
        }
        return this;
    }

    initBind() {
    }

    componentDidMount() {
        this.retrieveArticle();
    }

    retrieveArticle() {
        let id = getUrlParamster().id;
        let option = {
            url: `./api/article/getArticleDetail?id=${id}`,
            method: 'GET'
        }
        fetchUtility(option).then(res => {
            this.state.data = res.data;
            this.setState(this.state);
        }).catch(e => {
            console.log(e);
        })
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
                    {
                        Object.keys(this.state.data).length != 0 && <MarkDown
                            history={this.props.history}
                            data={this.state.data}
                        />
                    }
                </div>
            </Layout>
        </React.Fragment>
    }
}