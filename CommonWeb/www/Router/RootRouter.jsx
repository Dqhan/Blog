import { Route, Switch, HashRouter } from "react-router-dom";
import ModuleRouter from "./ModuleRouter";
import Home from "../JSX/Component/Home";
import Production from "../JSX/Component/Production/index";
import About from "../JSX/Component/About";
import Mark from "../JSX/Component/Mark";
import oAuthPromisition from "../JSX/Promisition/oAuthPromisition";
import WeChatPromisitionCheck from "../JSX/Promisition/WeChatPromisitionCheck";
import Forbidden from "../JSX/Promisition/Forbidden";

const RootRouter = () => {
  return (
    <HashRouter>
      <React.Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/oAuthPromisition" component={oAuthPromisition} />
          <Route
            exact
            path="/WeChatPromisitionCheck"
            component={WeChatPromisitionCheck}
          />
          <Route exact path="/403" component={Forbidden} />
          <Route exact path="/production" component={Production} />
          <Route exact path="/about" component={About} />
          <Route exact path="/mark" component={Mark} />
          <ModuleRouter />
          <Route component={Home} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};
export default RootRouter;
