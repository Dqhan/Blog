import Layout from '../../../Layouts/Layout';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.retrieve();
    }

    retrieve() {
        let option = {
            url: './api/about/getAbout',
            method: 'Get'
        }
        fetchUtility(option).then(res => {
            var a = res;
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return <React.Fragment>
            <Layout
                history={this.props.history}
                logo="个人简介|Dqhan's Blog"
            >
                <div className='about'>
                    <article>
                        <p>该博客整体采用了前后短分离方式，前段采用了SPA开发模式，应用框架为React，后台使用的语言为Node.js，框架为Express框架。</p>
                        <p>前后台通信使用的Fetch通信，前台使用的路由为React自己的路由，后台使用的路由为Node的路由，后台使用了两个服务，一个是API server，一个是Service server，一个是Service，
                            中间使用了http代理方式进行通信转换。
                        </p>
                        <p>后期准备采用PWA模式以及将ServiceWork实现离线缓存方式，有个更好的意见欢迎留言，蟹蟹~</p>
                    </article>
                </div>
            </Layout>
        </React.Fragment>
    }
}