import {
    Route,
    Switch
} from 'react-router-dom';

function lazyWithPreload(factory) {
    const Component = React.lazy(factory);
    Component.preload = factory;
    return Component;
}


const LeaveMsg = lazyWithPreload(() => { return import(/* webpackChunkName: "leavemessage" */ '../JSX/Components/LeaveMessage/LeaveMessage') });
const Blog = lazyWithPreload(() => { return import(/* webpackChunkName: "blog" */ '../JSX/Components/Blog/Blog') });
const Article = lazyWithPreload(() => { return import(/* webpackChunkName: "article" */ '../JSX/Components/Blog/Article') });
const Production = lazyWithPreload(() => { return import(/* webpackChunkName: "production" */ '../JSX/Components/Production/index') });
const About = lazyWithPreload(() => { return import(/* webpackChunkName: "about" */ '../JSX/Components/About/About') });
const Write = lazyWithPreload(() => { return import(/* webpackChunkName: "write" */ '../JSX/Components/Blog/Write') });
const Overview = lazyWithPreload(() => { return import(/* webpackChunkName: "overview" */ '../JSX/Components/Overview/Overview') });
const Mark = lazyWithPreload(() => { return import(/* webpackChunkName: "overview" */ '../JSX/Components/Mark/Mark') });

function moduleHtml(component) {
    component.preload()
    return component;
}

const SubRouter = () => {
    return <Switch>
        <Route path="/sub/leavemessage" component={moduleHtml(LeaveMsg)} />
        <Route path="/sub/blog" component={moduleHtml(Blog)} />
        <Route path="/sub/article" component={moduleHtml(Article)} />
        <Route path="/sub/production" component={moduleHtml(Production)} />
        <Route path="/sub/about" component={moduleHtml(About)} />
        <Route path="/sub/write" component={moduleHtml(Write)} />
        <Route path="/sub/overview" component={moduleHtml(Overview)} />
        <Route path="/sub/mark" component={moduleHtml(Mark)} />
    </Switch>
}
export default SubRouter;