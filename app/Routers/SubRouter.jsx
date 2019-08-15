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
import Write from '../JSX/Components/Blog/Write';
const SubRouter = () => {
    return <Switch>
        <Route path="/sub/lifemark" component={Life} />
        <Route path="/sub/leavemessage" component={LeaveMessage} />
        <Route path="/sub/blog" component={Blog} />
        <Route path="/sub/article" component={Article} />
        <Route path="/sub/production" component={Production} />
        <Route path="/sub/about" component={About} />
        <Route path="/sub/write" component={Write} />
    </Switch>
}
export default SubRouter;


