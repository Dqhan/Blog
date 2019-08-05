import {
    Route,
    Switch
} from 'react-router-dom';

import Life from '../JSX/Components/Life/Life';
import LeaveMessage from '../JSX/Components/LeaveMessage/LeaveMessage';
import Blog from '../JSX/Components/Blog/Blog';
import About from '../JSX/Components/About/About';
import Production from '../JSX/Components/Production/Production';
import Article from '../JSX/Components/Blog/Article';

const SubRouter = () => {
    return <Switch>
            <Route path="/sub/lifemark" component={Life} />
            <Route path="/sub/leavemessage" component={LeaveMessage} />
            <Route path="/sub/blog" component={Blog} />
            <Route path="/sub/article" component={Article} />
            <Route path="/sub/production" component={Production} />
            <Route path="/sub/about" component={About} />
        </Switch>
}
export default SubRouter;


