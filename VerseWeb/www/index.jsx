import Verse from './JSX/Verse';
require('./Less/index.less');
class VerseIndex extends React.Component {
    render() {
        return <Verse />
    }
}

$Scope.Modules.VERSE = VerseIndex;