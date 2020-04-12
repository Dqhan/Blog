import Router from '../Routers/Router';
import {
    HashRouter
} from 'react-router-dom';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.fooPrototype();
        this.state = {
            userInfo: null
        }
    }

    fooPrototype() {
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }

    render() {
        return <React.Fragment>
            <Router userInfo={this.state.userInfo} />
            <footer>
                <div className='footer-content'>
                    <p><a href="https://github.com/Dqhan" target="_blank">Github</a>·
                <a href="/#/">Home</a>·
                        管理·
                <a href="/#/sub/about">关于</a>
                        |署名·非商业用途·保持一致</p>
                    <p>Copyright © 2019-2022 Dqhan.</p>
                    <p><a href="http://beian.miit.gov.cn" target="_blank">辽ICP备19017890号-1</a></p>
                </div>
            </footer>
        </React.Fragment>
    }
}
