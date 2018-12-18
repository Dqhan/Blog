import React from 'react';
export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.initState().initBind();
    }

    initState() {
        this.state = {
            number: "",
            password: "",
            messages: [],
            comments: []
        }
        return this;
    }

    initBind() {
        this.handleNumberChanged = this.handleNumberChanged.bind(this);
    }

    componentDidMount() {
        this.retrieveLeaveMessage();
        this.retrieveNewComment();
    }

    retrieveLeaveMessage() {
        this.state.messages = [
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
        ]
        this.setState(this.state);
    }

    retrieveNewComment() {
        this.state.comments = [
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
            { message: '分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面，分手应该体面，谁都不要说抱歉，离开也很体面，认真付出的画面', author: '于文文' },
        ]
        this.setState(this.state);
    }

    renderLeaveMessage() {
        return this.state.messages.map((m, index) => {
            return <li key={index}>
                <div>{m.message}</div>
                <div>----{m.author}</div>
                <div className='clear-both'></div>
            </li>
        })
    }

    renderNewComment() {
        return this.state.comments.map((m, index) => {
            return <li key={index}>
                <div>{m.message}</div>
                <div>----{m.author}</div>
                <div className='clear-both'></div>
            </li>
        })
    }

    handleNumberChanged(e) {
        this.setState(Object.assign(this.state, {
            number: e.target.value
        }))
    }

    handlePasswordChanged(e) {
        this.setState(Object.assign(this.state, {
            password: e.target.value
        }))
    }

    render() {
        return <div className='summary'>
            <section className='login'>
                <h3>账号登录</h3>
                <div className='margin-bottom-10 margin-top-10'>
                    <label>账号：</label>
                    <input type='text' value={this.state.number} onChange={this.handleNumberChanged} />
                </div>
                <div className='margin-bottom-10'>
                    <label>密码：</label>
                    <input type='text' value={this.state.password} onChange={this.handlePasswordChanged} />
                </div>
                <RButton text='注册' />
                <RButton text='登录' style={{ marginLeft: '5px' }} />
            </section>
            <section>
                <h3>快速搜索</h3>
                <input className='margin-bottom-10 margin-top-10' type='text' placeholder="文章标题" />
                <RButton text='确定' style={{ marginLeft: '10px' }} />
            </section>
            <section className='about-me'>
                <h3>关于我</h3>
                <p>姓名：韩德琦</p>
                <p>年龄：26岁</p>
                <p>地点：大连市</p>
                <p>职务：Web前端开发</p>
                <p>自我简介：人丑嘴不甜，长的磕碜还没钱。PS：我就是个切页面的！</p>
                <div className='know-more'>了解更多</div>
                <ul>
                    <li>
                        <a href="https://github.com/Dqhan" target="_blank">
                            <span title='GitHub' style={{ backgroundImage: `url(${require('../../Image/git.png')})` }}></span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.cnblogs.com/moran1992/" target="_blank">
                            <span title='博客园' style={{ backgroundImage: `url(${require('../../Image/blog.png')})` }}></span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.dqhanhouse.com" target="_blank">
                            <span title='分享' style={{ backgroundImage: `url(${require('../../Image/share.png')})` }}></span>
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
            <section className='new-comments'>
                <h3>最新评论</h3>
                <ul>
                    {
                        this.renderNewComment()
                    }
                </ul>
            </section>
            <section className='new-leave-message'>
                <h3>最新留言</h3>
                <ul>
                    {
                        this.renderLeaveMessage()
                    }
                </ul>
            </section>
        </div>
    }
}