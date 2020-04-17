require('./JSX/CommonUI/index');
require('./Less/index.less');
require('./Util/Util');
require("./Util/Scope");

import RootRouter from './JSX/Router/RootRouter';

function render() {
    ReactDOM.render(
        (<RootRouter />),
        document.getElementById('app')
    );
}

render();