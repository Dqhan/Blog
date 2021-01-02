import Verse from './JSX/Verse';
require('./style/index.less');
class VerseIndex extends React.Component {
    render() {
        return <Verse />
    }
}

$Scope.Modules.VERSE = VerseIndex;