import Router from './router';
require('./Less/index.less');
class BlogIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Router />
    }
}
$Scope.Modules.BLOG = BlogIndex;