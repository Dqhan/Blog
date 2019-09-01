require('./overview.less');

import Layout from '../../../Layouts/Layout';

var err = [
    'handleRowDataChanged',
    'pagerChangedHandler'
];

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [],
            pageSize: 5,
            selectedPage: 1,
            pageCount: 0
        };
        err.forEach(e => {
            this[e] = this[e].bind(this);
        })
        this.columns = [
            {
                name: "title",
                width: "200px"
            },
            {
                name: "time",
                width: "200px"
            },
            {
                name: "author",
                width: "200px"
            },
            {
                name: "tags",
                width: "200px"
            }
        ]
    }

    componentDidMount() {
        this.retrieveTotalBlogs()
    }

    retrieveTotalBlogs() {
        $$.loading(true);
        let data = {
            limit: this.state.pageSize,
            offset: this.state.selectedPage
        },
            option = {
                url: `./api/article/retrieveoverview`,
                method: "POST",
                data: data
            };
        fetchUtility(option)
            .then(res => {
                this.setState({
                    source: res.data.list,
                    pageCount: Math.ceil(res.data.total / this.state.pageSize)
                })
                $$.loading(false);
            })
            .catch(e => {
                $$.loading(false);
                console.log(e);
            });
    }

    pagerChangedHandler(e, args) {
        this.setState({
            selectedPage: args.newValue
        }, () => {
            this.retrieveTotalBlogs();
        })
    }

    handleRowDataChanged(e, args) {
        var a = args;
    }

    render() {
        return <React.Fragment>
            <Layout
                history={this.props.history}
                logo="总览|Dqhan's Blog"
            >
                <div className='overview'>
                    <div className='overview-content'>
                        <$$.Table
                            columns={this.columns}
                            items={this.state.source}
                            rowTempate={OverviewRowTempate}
                            rowDataChanged={this.handleRowDataChanged}
                        />
                    </div>
                    <div className='overview-pager'>
                        <$$.Pager
                            pageSize={this.state.pageSize}
                            pageCount={this.state.pageCount}
                            selectedPage={this.state.selectedPage}
                            selectedPageChanged={this.pagerChangedHandler}
                        />
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    }
}

class OverviewRowTempate extends $$.DataGridRow {
    constructor(props) {
        super(props);
        this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    handleTitleClick(e) {
        this.trigger("rowDataChanged", e, {
            actionType: "click"
        });
    }

    render() {
        var data = this.props.rowDate;
        return (
            <div role="table-body-row" data-part="row">
                <div data-part="cell" className="overview-content-title" onClick={this.handleTitleClick}>
                    {data.title}
                </div>
                <div data-part="cell">{CommonUtil.formatDateTime(new Date(parseInt(data.time)), true)}</div>
                <div data-part="cell">{data.author}</div>
                <div data-part="cell">{data.tags}</div>
            </div>
        );
    }
}
