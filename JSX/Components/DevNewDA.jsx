import React from 'react';
import Layout from '../../Layouts/Layout';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Layout hasHeader={true}>
            "小伙伴儿"
    </Layout>
    }
}