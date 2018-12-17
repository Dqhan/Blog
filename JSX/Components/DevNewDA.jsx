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
                logo={'工作'}
            >
                <div className='work'>
                    <div className='work-header'>
                        <img src='../../Image/workHeader.jpg' />
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}