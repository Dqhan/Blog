import {
    Route,
    Switch
} from 'react-router-dom';
// const Article = lazyWithPreload(() => { return import(/* webpackChunkName: "article" */ './JSX/Article') });
// const Write = lazyWithPreload(() => { return import(/* webpackChunkName: "write" */ './JSX/Write') });
// const Blog = lazyWithPreload(() => { return import(/* webpackChunkName: "blog" */ './JSX/Blog') });

import Article from './Components/Article';
import Write from './Components/Write';
import Blog from './Components/Blog';

function lazyWithPreload(factory) {
    const Component = React.lazy(factory);
    Component.preload = factory;
    return Component;
}

function moduleHtml(component) {
    component.preload()
    return component;
}

const Router = () => {
    return <Switch>
        {/* <Route path="/" component={moduleHtml(Blog)} />
        <Route path="/article" component={moduleHtml(Article)} />
        <Route path="/write" component={moduleHtml(Write)} /> */}
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/article" component={Article} />
        <Route exact path="/blog/write" component={Write} />
    </Switch>
}
export default Router;