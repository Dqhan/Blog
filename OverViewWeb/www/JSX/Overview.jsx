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
            pageCount: 0,
            javascriptTotal: 0,
            typescriptTotal: 0,
            es6Total: 0,
            webTotal: 0,
            sjmoduleTotal: 0,
            webpackTotal: 0,
            nodeTotal: 0,
            reactTotal: 0
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
        // this.createEChart();
        let array = [
            // this.retrieveBlogsForPie(),
            this.retrieveBlogs()
        ];
        Promise.all(array)
            .then(res => {
                // let preSource = res[0],
                let datagridSource = res[0];
                // this.retrieveBlogsForPieCallback(preSource);
                this.retrieveBlogsCallback(datagridSource);
            })
            .catch(e => {
                throw new Error(e);
            })
    }

    createEChart() {
        this.overviewEChart = echarts.init(document.getElementById('overview-chart'));
        this.overviewEChart.on("click", this.hanldeEChartClick.bind(this));
    }

    hanldeEChartClick(e) {
        let clr = {
            "Javascript": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.Javascript),
            "React": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.React),
            "Node": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.Node),
            "Typescript": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.Typescript),
            "Es6": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.Es6),
            "Webpack": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.Webpack),
            "设计模式": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.SJModule),
            "Web知识体系": this.hanldeEChartClickRetrieveBlogs.bind(this, Util.TAG_TYPE.Web)
        };
        clr[e.data.name]();
    };

    retrieveBlogsForPie() {
        let request = {};
        let option = {
            url: `./blog/api/getartciles`,
            method: 'POST',
            body: request
        };
        return fetchUtility(option);
    }

    retrieveBlogsForPieCallback(res) {
        let javascriptTotal = 0,
            typescriptTotal = 0,
            es6Total = 0,
            webTotal = 0,
            sjmoduleTotal = 0,
            webpackTotal = 0,
            nodeTotal = 0,
            reactTotal = 0;
        res.result.source.map(l => {
            if (l.tags.includes(Util.TAG_TYPE.Javascript)) javascriptTotal++;
            if (l.tags.includes(Util.TAG_TYPE.Typescript)) typescriptTotal++;
            if (l.tags.includes(Util.TAG_TYPE.Es6)) es6Total++;
            if (l.tags.includes(Util.TAG_TYPE.SJModule)) sjmoduleTotal++;
            if (l.tags.includes(Util.TAG_TYPE.Webpack)) webpackTotal++;
            if (l.tags.includes(Util.TAG_TYPE.Node)) nodeTotal++;
            if (l.tags.includes(Util.TAG_TYPE.React)) reactTotal++;
            if (l.tags.includes(Util.TAG_TYPE.Web)) webTotal++;
        })
        this.setState({
            javascriptTotal: javascriptTotal,
            typescriptTotal: typescriptTotal,
            es6Total: es6Total,
            sjmoduleTotal: sjmoduleTotal,
            webpackTotal: webpackTotal,
            nodeTotal: nodeTotal,
            reactTotal: reactTotal,
            webTotal: webTotal
        }, () => {
            this.renderPie();
        });
    }

    hanldeEChartClickRetrieveBlogs(tag) {
        this.retrieveBlogs(tag)
            .then(res => {
                this.retrieveBlogsCallback(res);
            })
            .catch(e => {
                throw new Error(e);
            });
    }

    retrieveBlogs() {
        $$.loading(true);
        let args = Array.prototype.slice.call(arguments);
        let request = {
            offset: this.state.selectedPage,
            limit: this.state.pageSize
        };
        if (args.length > 0) request['tags'] = [].concat(args);
        let option = {
            url: `./blog/api/getartciles`,
            method: 'POST',
            body: request
        };
        return fetchUtility(option);
    }

    retrieveBlogsCallback(res) {
        this.setState({
            source: res.result.source,
            pageCount: Math.ceil(res.result.total / this.state.pageSize),
        })
        $$.loading(false);
    }

    renderPie() {
        let self = this,
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
                            { value: self.state.javascriptTotal, name: 'Javascript' },
                            { value: self.state.reactTotal, name: 'React' },
                            { value: self.state.nodeTotal, name: 'Node' },
                            { value: self.state.typescriptTotal, name: 'Typescript' },
                            { value: self.state.es6Total, name: 'Es6' },
                            { value: self.state.webTotal, name: 'Webpack' },
                            { value: self.state.sjmoduleTotal, name: '设计模式' },
                            { value: self.state.webTotal, name: 'Web知识体系' }
                        ],
                        color: ["#99CCFF", "#CCCCFF", "#FFCCCC", "#99CC33", "#99CCCC", "#66CC99", "#996699", "#FFCC99"],
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
        this.state.selectedPage = args.newValue;
        this.retrieveBlogs()
            .then(res => {
                this.retrieveBlogsCallback(res);
            })
            .catch(e => {
                throw new Error(e);
            });
    }

    handleRowDataChanged(e, args) {
        let id = args.data._id,
            path = `#/blog/article?id=${id}`;
        window.open(path);
    }

    render() {
        return <React.Fragment>
            <R.Layout
                history={this.props.history}
                logo="总览|Dqhan's Blog"
            >
                <div className='overview'>
                    <div className='overview-content'>
                        {/* <div id="overview-chart" style={{ width: "100%", height: "400px", marginBottom: '20px' }}></div> */}
                        <R.Datagrid
                            columns={this.columns}
                            items={this.state.source}
                            rowTempate={OverviewRowTempate}
                            rowDataChanged={this.handleRowDataChanged}
                        />
                    </div>
                    <div className='overview-pager'>
                        <R.Pager
                            pageSize={this.state.pageSize}
                            pageCount={this.state.pageCount}
                            selectedPage={this.state.selectedPage}
                            selectedPageChanged={this.pagerChangedHandler}
                        />
                    </div>
                </div>
            </R.Layout>
        </React.Fragment>
    }
}

class OverviewRowTempate extends R.DataGridRow {
    constructor(props) {
        super(props);
    }

    handleTitleClick(data, e) {
        this.trigger("rowDataChanged", e, {
            actionType: "click",
            data: data
        });
    }

    render() {
        var data = this.props.rowDate;
        return (
            <div role="table-body-row" data-part="row">
                <div data-part="cell" className="overview-content-title" onClick={this.handleTitleClick.bind(this, data)}>
                    {data.title}
                </div>
                <div data-part="cell">{CommonUtil.formatDateTime(new Date(parseInt(data.time)), true)}</div>
                <div data-part="cell">{data.author}</div>
                <div data-part="cell">{data.tags.map(t => {
                    return Util.assembleTagItem(t) + ' ';
                })}</div>
            </div>
        );
    }
}
