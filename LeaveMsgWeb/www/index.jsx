require('./style/index.less');
import LeaveMessage from './JSX/Component/LeaveMessage';


class LMIndex extends React.Component {
    render() {
        return <LeaveMessage />
    }
}


$Scope.Modules.LEAVEMESSAGE = LMIndex;