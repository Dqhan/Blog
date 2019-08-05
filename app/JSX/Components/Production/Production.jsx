import Layout from '../../../Layouts/Layout';
import Content from '../Content';

export default class Production extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productions: []
        }
    }

    render() {
        return <React.Fragment>
            <Layout
                hasHeader={true}
                hasModuleLogo={true}
                logo={'作品'}
            >
                <div className='product'>
                    <div className='product-header'>
                        <img src={require('../../../Image/productHeader.jpg')} />
                    </div>
                    <Content
                        history={this.props.history}
                        source={this.state.productions}
                    />
                </div>
            </Layout>
        </React.Fragment>
    }
}