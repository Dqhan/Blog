import React from 'react';
export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            messages: []
        }
        return this;
    }

    initBind() {

    }

    componentDidMount() {
        this.retrieveLeaveMessage()
    }

    retrieveLeaveMessage() {
        
        this.setState(this.state);
    }

    render() {
        return <div className='summary'>
            <section>
                <h3>账号登录</h3>
                <input type='text' />
            </section>
            <section>
                <h3>快速搜索</h3>
                <input type='text' />
            </section>
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
            <section>
                <h3>最新留言</h3>

            </section>
        </div>
    }
}