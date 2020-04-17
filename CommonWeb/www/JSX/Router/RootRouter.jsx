import {
    Route,
    Switch,
    HashRouter
} from 'react-router-dom';
import ModuleRouter from './ModuleRouter';
import Home from '../Component/Home';
import Production from '../Component/Production/index';
import About from '../Component/About';
import Mark from '../Component/Mark';
import oAuthPromisition from '../Promisition/oAuthPromisition';
import WeChatPromisitionCheck from '../Promisition/WeChatPromisitionCheck';
import Forbidden from '../Promisition/Forbidden';

const RootRouter = () => {
    return <HashRouter>
        <React.Suspense fallback={<div>loading...</div>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/oAuthPromisition" component={oAuthPromisition} />
                <Route exact path="/WeChatPromisitionCheck" component={WeChatPromisitionCheck} />
                <Route exact path="/403" component={Forbidden} />
                <Route exact path="/production" component={Production} />
                <Route exact path="/about" component={About} />
                <Route exact path="/mark" component={Mark} />
                <ModuleRouter />
                <Route component={Home} />
            </Switch>
        </React.Suspense>
    </HashRouter>
}
export default RootRouter;