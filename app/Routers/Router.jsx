import {
    Route,
    Switch
} from 'react-router-dom';
import Home from '../JSX/Components/Home';
import oAuthPromisition from '../JSX/Promisition/oAuthPromisition';
import WeChatPromisitionCheck from '../JSX/Promisition/WeChatPromisitionCheck';
import Forbidden from '../JSX/Promisition/Forbidden';
import ModuleRouter from './ModuleRouter';

class LazyLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            module: null
        }
    }

    componentWillMount() {
        this.load(this.props.module, this.props.path);
    }

    componentWillReceiveProps(newProps) {
        this.load(newProps.module, newProps.path);
    }

    load(module, path) {
        let cssPath = path + '',
            jsPath = path + '';
        LazyLoad.css(cssPath);
        LazyLoad.js(jsPath, () => {
            this.state.module = Modules[module];
        })
    }

    render() {
        if (!this.state.module) return null;
        else this.props.children(this.state.module);
    }


}

const HTMLModule = (name, path) => {
    let ModuleComponent = Modules[name];
    return <React.Fragment>
        {
            ModuleComponent ? <ModuleComponent param={param} /> :
                <LazyLoader>
                    {
                        (Item) => <Item param={param} />
                    }
                </LazyLoader>
        }
    </React.Fragment>
}

const Router = () => {
    return <Switch>
        <Route path="/oAuthPromisition" component={oAuthPromisition} />
        <Route path="/WeChatPromisitionCheck" component={WeChatPromisitionCheck} />
        <Route path="/403" component={Forbidden} />
        <Route path="/sub" component={ModuleRouter} />
        <Route path="/" component={Home} />
    </Switch>
}
export default Router;


