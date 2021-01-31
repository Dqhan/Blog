require("./style/index.less");
import Overview from './JSX/Overview'
export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Overview />
  }
}
