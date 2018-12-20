import React from 'react';
import Layout from '../../Layouts/Layout';

export default class Production extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <React.Fragment>
            <Layout
                hasHeader={true}
                hasModuleLogo={true}
                logo={'作品'}
            >
                <div className='product'>
                    <div className='product-header'>
                        <img src={require('../../Image/productHeader.jpg')} />
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}