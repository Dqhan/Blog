import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../AUI/Banner';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            source: [
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
            ]
        }
        return this;
    }

    initBind() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    renderSource() {
        return this.state.source.length > 0 && this.state.source.map((s, index) => {
            return <section className='section-item' key={`section-${index}`}>
                <div>
                    <img src="../../Image/SectionImage/1.jpg" />
                </div>
                <div>
                    <h3 className='section-item-title'>{s.title}</h3>
                    <p className='section-item-description'>{s.description}</p>
                    <RButton text="Read More"></RButton>
                </div>
            </section>
        })
    }

    render() {
        return <div className='home-page'>
            <header className='header'>
                <div className='container'>
                    <h1>Dqhan's Blog</h1>
                    <nav className='nav-bar'>
                        <ul>
                            <li className='nav-item'><Link to='/'>首页</Link></li>
                            <li className='nav-item'><Link to='/sub/lifemark'>生活</Link></li>
                            <li className='nav-item'><Link to='/sub/workmark'>工作</Link></li>
                            <li className='nav-item'><Link to='/sub/blog'>博客</Link></li>
                            <li className='nav-item'><Link to='/sub/production'>作品</Link></li>
                            <li className='nav-item'><Link to='/sub/about'>关于</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Banner />
            <div className='home-body'>
                <div className='sections inline-block'>
                    <div className='sections-content-title'>
                        <h2>最新动态</h2>
                    </div>
                    {this.renderSource()}
                </div>
                <div className='summary inline-block'>
                    <section>
                        <h3>了解更多</h3>
                        <ul>
                            <li>
                                <a href="https://github.com/Dqhan" target="_blank">
                                    <span title='GitHub' style={{ backgroundImage: "url(../../Image/git.png)" }}></span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.cnblogs.com/moran1992/" target="_blank">
                                    <span title='博客园' style={{ backgroundImage: "url(../../Image/blog.png)" }}></span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.dqhanhouse.com" target="_blank">
                                    <span title='分享' style={{ backgroundImage: "url(../../Image/share.png)" }}></span>
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3>标签集</h3>
                        <div className='tags'>
                            <span style={{ background: '#FF0000' }}>Html5</span>
                            <span style={{ background: '#33FF00' }}>JavaScript</span>
                            <span style={{ background: '#FF66FF' }}>Css3</span>
                            <span style={{ background: '#FF9900' }}>React</span>
                            <span style={{ background: '#00FFFF' }}>MongoDB</span>
                            <span style={{ background: '#CC66FF' }}>Node</span>
                            <span style={{ background: '#0000FF' }}>前端构建</span>
                            <span style={{ background: '#666666' }}>设计模式</span>
                        </div>
                    </section>
                </div>
            </div>
            <footer>
                <div>暂时没有</div>
            </footer>
        </div>
    }
}