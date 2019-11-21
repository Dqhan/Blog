import {
    Route,
    Switch,
    HashRouter
} from 'react-router-dom';
import Home from '../JSX/Components/Home';
import oAuthPromisition from '../JSX/Promisition/oAuthPromisition';
import WeChatPromisitionCheck from '../JSX/Promisition/WeChatPromisitionCheck';
import Forbidden from '../JSX/Promisition/Forbidden';
import ModuleRouter from './ModuleRouter';

const RootRouter = () => {
    return <HashRouter>
        <React.Suspense fallback={<div>loading</div>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/oAuthPromisition" component={oAuthPromisition} />
                <Route path="/WeChatPromisitionCheck" component={WeChatPromisitionCheck} />
                <Route path="/403" component={Forbidden} />
                <Route path="/sub" component={ModuleRouter} />

            </Switch>
        </React.Suspense>
    </HashRouter>
}
export default RootRouter;


