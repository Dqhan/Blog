import {
    Route,
    Switch
} from 'react-router-dom';

function ModuleHTML(factory) {
    var Component = React.lazy(factory);
    return Component;
}

const SubRouter = () => {
    return <Switch>
        <Route path="/sub/leavemessage" component={ModuleHTML(() => { return import(/* webpackChunkName: "leavemessage" */ '../JSX/Components/LeaveMessage/LeaveMessage') })} />
        <Route path="/sub/blog" component={ModuleHTML(() => { return import(/* webpackChunkName: "blog" */ '../JSX/Components/Blog/Blog') })} />
        <Route path="/sub/article" component={ModuleHTML(() => { return import(/* webpackChunkName: "article" */ '../JSX/Components/Blog/Article') })} />
        <Route path="/sub/production" component={ModuleHTML(() => { return import(/* webpackChunkName: "production" */ '../JSX/Components/LeaveMessage/LeaveMessage') })} />
        <Route path="/sub/about" component={ModuleHTML(() => { return import(/* webpackChunkName: "about" */ '../JSX/Components/About/About') })} />
        <Route path="/sub/write" component={ModuleHTML(() => { return import(/* webpackChunkName: "write" */ '../JSX/Components/Blog/Write') })} />
        <Route path="/sub/overview" component={ModuleHTML(() => { return import(/* webpackChunkName: "overview" */ '../JSX/Components/Overview/Overview') })} />
    </Switch>
}
export default SubRouter;


