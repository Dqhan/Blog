export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return <React.Fragment>
            <R.Layout
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
                                    服务器端熟练使用Nginx、Nodejs、MongoDB、C#、SQLServer等
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
                                    <div>打酱油</div>
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>生活上</div>
                                    <div>向往自由自在，不受拘束草原生活</div>
                                </li>
                            </ul>
                        </div>
                        <hr></hr>
                    </section>
                    <section>
                        <div className="about-item-title">
                            <span className="fi-page-placeholder-a"></span>
                            欢迎打扰
                            <i className="light"></i>
                        </div>
                        <div className="about-item-contain">
                            <ul>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>邮箱</div>
                                    <div>1195209924@qq.com</div>
                                </li>
                            </ul>
                        </div>
                        <hr></hr>
                    </section>
                    <section>
                        <div className="about-item-title">
                            <span className="fi-page-placeholder-a"></span>
                            更多信息
                            <i className="light"></i>
                        </div>
                        <div className="about-item-contain">
                            <ul>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>Github</div>
                                    <div>https://github.com/Dqhan</div>
                                </li>
                                <li className="fi-page-hand-over-packed-bags-a">
                                    <div>CNblogs</div>
                                    <div>https://www.cnblogs.com/moran1992</div>
                                </li>
                            </ul>
                        </div>
                        <hr></hr>
                    </section>
                </div>
            </R.Layout>
            <More />
        </React.Fragment>
    }
}

class More extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true
        }
    }

    componentWillMount() {
        // this.preload();
    }

    // preload() {
    //     let imgs = [{ name: 'pic', url: 'https://www.dqhanblog.cn:4335/%E5%A4%B4%E5%83%8F.png' }],
    //         count = 0;
    //     for (let img of imgs) {
    //         var image = new Image();
    //         image.src = img.url;
    //         image.onload = function () {
    //             count++;
    //             if (count === imgs.length) {
    //                 console.log('over');
    //             } else {
    //                 console.log('loading...');
    //             }
    //         }
    //     }
    // }

    handleChangeStatus() {
        this.setState({
            status: !this.state.status
        })
    }

    render() {
        return <div className='know-more'>
            <div className={this.state.status ? 'know-more-body' : 'know-more-body active'}>
                <div className='know-more-btn' onClick={this.handleChangeStatus.bind(this)}>
                    <div className={this.state.status ? 'fi-page-arrow-left-double-as' : 'fi-page-arrow-right-double-as'}></div>
                </div>
                <div className='know-more-content'>
                    <div className='know-more-content-pic'></div>
                    <ul>
                        <li><a href='' target='_blank'>在线简历</a></li>
                        <li><a href='' target='_blank'>关于站点</a></li>
                    </ul>
                </div>
            </div>
        </div>
    }
}