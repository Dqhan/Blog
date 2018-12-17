import React from 'react';
import Layout from '../../Layouts/Layout';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <React.Fragment>
            <Layout
                hasHeader={true}
                hasModuleLogo={true}
                logo={'简介'}
            >
                <div className='about'>
                    <div className='about-header'>
                        <img src='../../Image/aboutHeader.jpg' />
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}