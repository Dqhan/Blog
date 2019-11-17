import Index from './JSX/Index';
require('./JSX/AUI/Btn');
require("./Contents/index.less");
require('./Util/Util');
require("./Util/Scope");

function render() {
    ReactDOM.render(
        (<Index />),
        document.getElementById('app')
    );
}

render();