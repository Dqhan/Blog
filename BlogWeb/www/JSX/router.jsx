// import {
//     Route,
//     Switch
// } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Article from "./Components/Article";
import Write from "./Components/Write";
import Blog from "./Components/Blog";

// function lazyWithPreload(factory) {
//   const Component = React.lazy(factory);
//   Component.preload = factory;
//   return Component;
// }

// function moduleHtml(component) {
//   component.preload();
//   return component;
// }

const RouterIndex = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/article" component={Article} />
        <Route exact path="/blog/write" component={Write} />
      </Switch>
    </Router>
  );
};
export default RouterIndex;
