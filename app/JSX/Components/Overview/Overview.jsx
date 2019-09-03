require('./overview.less');
import Layout from '../../../Layouts/Layout';
let err = [
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
        this.createEChart();
        this.retrieveTotalBlogs()
    }

    createEChart() {
        this.overviewEChart = echarts.init(document.getElementById('overview-chart'));
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
                }, () => {
                    this.renderPie();
                })
                $$.loading(false);
            })
            .catch(e => {
                $$.loading(false);
                console.log(e);
            });
    }

    renderPie() {
        let
            option = {
                title: {
                    text: 'Blog分类统计',
                    x: 'center',
                    textStyle: {
                        color: '#5B5B5B',
                        fontStyle: 'normal',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    bottom: 'bottom',
                    data: ['Javascript', 'React', 'Node', 'Typescript', 'Es6', 'Webpack', '设计模式', 'Web知识体系']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: 'Javascript' },
                            { value: 310, name: 'React' },
                            { value: 234, name: 'Node' },
                            { value: 135, name: 'Typescript' },
                            { value: 1548, name: 'Es6' },
                            { value: 135, name: 'Webpack' },
                            { value: 1548, name: '设计模式' },
                            { value: 1548, name: 'Web知识体系' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

        this.overviewEChart.setOption(option);
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
                        <div id="overview-chart" style={{ width: "100%", height: "400px" }}></div>
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
