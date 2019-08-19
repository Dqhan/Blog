import {
    Route,
    Switch
} from 'react-router-dom';
import Home from '../JSX/Components/Home';
import SubHome from '../JSX/Components/SubHome';
import oAuthPromisition from '../JSX/Promisition/oAuthPromisition';
import WeChatPromisitionCheck from '../JSX/Promisition/WeChatPromisitionCheck';

const Router = () => {
    return <Switch>
            <Route path="/sub" component={SubHome} />
            <Route path="/oAuthPromisition" component={oAuthPromisition} />
            <Route path="/WeChatPromisitionCheck" component={WeChatPromisitionCheck} />
            <Route path="/" component={Home} />
        </Switch>
}
export default Router;


