import {
    Route,
    Switch
} from 'react-router-dom';
import Home from '../JSX/Components/Home';
import SubHome from '../JSX/Components/SubHome';

const Router = () => {
    return <Switch>
            <Route path="/sub" component={SubHome} />
            <Route path="/" component={Home} />
        </Switch>
}
export default Router;


