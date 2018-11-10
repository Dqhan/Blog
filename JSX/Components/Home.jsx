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
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
                { date: { year: '2018', others: '11月10日' }, title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
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
        return this.state.source.length > 0 && this.state.source.map(s => {
            return <section className='section-item'>
                <div className='section-item-date'>
                    <div className='section-item-date-year'>
                        {s.date.year}
                    </div>
                    <div className='section-item-date-others'>
                        {s.date.others}
                    </div>
                </div>
                <div>
                    <div className='section-item-title'>{s.title}</div>
                    <div className='section-item-description'>{s.description}</div>
                </div>
            </section >
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
                <div className='sections'>
                    <div className='content-title'>
                        <h2>最新动态</h2>
                    </div>
                    {this.renderSource()}
                </div>
                <div className='summary'>
                    Logo
                </div>
            </div>
            <footer>

            </footer>
        </div>
    }
}