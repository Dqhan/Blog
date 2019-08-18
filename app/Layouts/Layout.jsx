import React from 'react';
import Header from '../JSX/Components/Header';
import Summary from '../JSX/Components/Summary/Summary';
import {
    Link
} from 'react-router-dom';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.initBind();
    }

    initBind() {
        this.goHomePage = this.goHomePage.bind(this);
    }

    componentDidMount() {
        this.initComputed()
    }

    initComputed() {
    }

    goHomePage() {
        this.props.history.push('');
    }

    render() {
        return <div id={this.props.id} className='layout'>
            <div className='layout-container'>
                {/* <a className='git-link' href="https://github.com/Dqhan" target="_blank" /> */}
                {
                    !this.props.isHome && <React.Fragment>
                        <Header isHome={false} />
                        <div className="layout-header"> </div>
                        <div className="layout-header-info">
                            <div className="layout-header-info-main">{this.props.logo}</div>
                            <div className="layout-header-info-sub">Welcome to Dqhan's Blog</div>
                            <div className="layout-header-info-link">
                                <ui>
                                    <li>
                                        <a className="font-icon iconfont icon-github" href="https://github.com/Dqhan" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="font-icon iconfont icon-CN_cnblogs" href="https://www.cnblogs.com/moran1992/" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="font-icon iconfont icon-weixin" href="https://www.dqhanhouse.com" target="_blank"></a>
                                    </li>
                                </ui>
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div className='layout-main'>
                    <div className='layout-main-content'>
                        {this.props.children}
                    </div>
                </div>
            </div>
            <footer>
                <div>no footer</div>
            </footer>
        </div>
    }
}