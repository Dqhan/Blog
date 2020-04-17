import Overview from "./JSX/Overview";
require('./Less/index.less')
class OverViewIndex extends React.Component {
    render() {
        return <React.Fragment>
            <Overview />
        </React.Fragment>
    }
}


$Scope.Modules.OVERVIEW = OverViewIndex;