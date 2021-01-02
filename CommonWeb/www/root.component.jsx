require("./JSX/CommonUI/index");
require("./style/index.less");
require("./Util/Util");
require("./Util/Scope");

import RootRouter from "./Router/RootRouter";

export default class App extends React.Component {
  render() {
    return <RootRouter />;
  }
}
