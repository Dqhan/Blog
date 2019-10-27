import Layout from '../../../Layouts/Layout';

export default class Production extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
        };
        return this;
    }

    initBind() {
    }

    componentDidMount() {

    }

    render(){
        return <React.Fragment>
        <Layout
            history={this.props.history}
            logo="UI Framework|Dqhan's Blog"
        >
            <div>Production</div>
        </Layout>
    </React.Fragment>
    }
}