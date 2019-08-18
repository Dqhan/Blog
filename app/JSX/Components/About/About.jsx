import Layout from '../../../Layouts/Layout';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return <React.Fragment>
            <Layout
                history={this.props.history}
                logo="个人简介|Dqhan's Blog"
            >
                <div className='about'>
                    <section>
                        <div className="about-item-title">
                            <span className="fi-page-placeholder-a"></span>
                            韩德琦
                            <i className="light"></i>
                        </div>
                        <div className="about-item-contain">
                            <ul>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>职位</div>
                                    <div>前端开发工程师</div>
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>毕业院校</div>
                                    <div>哈尔滨理工大学-软件工程</div>
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>现居地</div>
                                    <div>辽宁省大连市</div>
                                </li>
                            </ul>
                        </div>
                        <hr></hr>
                    </section>
                    <section>
                        <div className="about-item-title">
                            <span className="fi-page-placeholder-a"></span>
                            专业技能
                            <i className="light"></i>
                        </div>
                        <div className="about-item-contain">
                            <ul>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    熟练JavaScript、ES5、ES6、Html5、Css等前端基本技能
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    掌握浏览器渲染原理、浏览器内存分配
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    熟练掌握React、Knockout、Vue等前端框架，深刻理解MVVM表现与数据分析思想
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    掌握Webpack、Gulp、Grunt等前端构建工具
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    熟练掌握常用设计模式，前端工程搭建
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    熟悉HTTP协议
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    服务器端熟练使用Nodejs、MongoDB、C#、SQLServer等
                                </li>
                            </ul>
                        </div>
                        <hr></hr>
                    </section>
                    <section>
                        <div className="about-item-title">
                            <span className="fi-page-placeholder-a"></span>
                            小梦想
                            <i className="light"></i>
                        </div>
                        <div className="about-item-contain">
                            <ul>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>工作上</div>
                                    <div>成为一名前端架构师</div>
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>生活上</div>
                                    <div>向往自由自在，不受拘束草原生活</div>
                                </li>
                            </ul>
                        </div>
                        <hr></hr>
                    </section>
                </div>
            </Layout>
        </React.Fragment>
    }
}