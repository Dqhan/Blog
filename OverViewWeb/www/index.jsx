import Overview from "./JSX/Overview";
require('./style/index.less')
class OverViewIndex extends React.Component {
    render() {
        return <React.Fragment>
            <Overview />
        </React.Fragment>
    }
}


$Scope.Modules.OVERVIEW = OverViewIndex;