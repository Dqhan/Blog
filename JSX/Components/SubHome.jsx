import React from 'react';
import SubRouter from './../../Routers/SubRouter';
import Layout from './../../Layouts/Layout';

export default class SubHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Layout>
            <SubRouter />
        </Layout>
    }
}
