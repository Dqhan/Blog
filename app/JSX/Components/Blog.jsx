import React from 'react';
import Content from './Content';
import Layout from '../../Layouts/Layout';
import Editor from '../AUI/Editor';

const BlogMode = {
    Show: 0,
    Write: 1,
    All: 2
}

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            mode: BlogMode.Show,
            blogs: []
        }
        return this;
    }

    initBind() {

    }

    componentDidMount() {
        this.retrieveBlogs();
    }

    retrieveBlogs() {
        this.state.blogs = [
            { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
            { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
            { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
            { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' },
            { title: '最新1', description: '曾有个密友问我，她说：“亲爱的，女生到底是应该嫁给爱情，还是嫁给现实呢？嫁给现实，无非就是自己少奋斗几年。而后用10数年的时间去后悔。不过这么说也算牵强，身边不乏些嫁给现实的朋友，在柴米油盐的生活中不仅慢慢习惯上了对方的存在，那种习惯略带些依赖的味道，并在长此以往的依赖中得了一种病' }
        ]
        this.setState(this.state)
    }

    handleCancelClick() {
        this.setState({
            mode: BlogMode.Show
        })
    }

    handleShowAllBlog() {
        this.setState({
            mode: BlogMode.All
        })
    }

    handleWriteBlog() {
        this.setState({
            mode: BlogMode.Write
        })
    }

    render() {
        return <React.Fragment>
            {
                this.state.mode == BlogMode.Show && <Layout
                    hasHeader={true}
                    hasModuleLogo={true}
                    logo={'博客园'}
                >
                    <div className='blog'>
                        <div className='blog-header'>
                            <img src={require('../../Image/blogHeader.jpg')} />
                        </div>
                        <div className='classify'>
                            <article>Javascript</article>
                            <article>React</article>
                            <article>Node</article>
                            <article>Css</article>
                            <article>工作笔记</article>

                        </div>
                        <Content
                            source={this.state.blogs}
                        />
                        <div style={{ textAlign: ' center' }}>
                            <RButton text="查看更多" style={{ width: '200px', margin: '0 20px' }} onClick={this.handleShowAllBlog.bind(this)}></RButton>
                            <RButton text="写博客" style={{ width: '200px' }} onClick={this.handleWriteBlog.bind(this)}></RButton>
                        </div>
                    </div>
                </Layout>
            }
            {
                this.state.mode == BlogMode.Write && <Editor
                    cancel={this.handleCancelClick.bind(this)}
                />
            }
        </React.Fragment>
    }
}