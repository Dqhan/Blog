import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Combobox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { text0: "text0", text1: "text1", text2: "text2", text3: "text3" },
                { text0: "text0", text1: "text1", text2: "text2", text3: "text3" },
                { text0: "text0", text1: "text1", text2: "text2", text3: "text3" }
            ]
        }
    }

    rowDataChanged(e, args) {
        var action = args.actionType;
        switch (action) {
            case "checked":
                console.log(args);
                break;
            case "click":
                console.log(args);
                break;
            default:
                break;
        }
    }

    handleIsSelectAllChanged() {
        this.setState({
            isSelectAll: !this.state.isSelectAll
        });
    }

    getColumns() {
        return [
            {
                width: "30px",
                template: (
                    <input
                        type="checkbox"
                        checked={this.state.isSelectAll}
                        onChange={this.handleIsSelectAllChanged.bind(this)}
                    />
                )
            },
            {
                name: "action",
                width: "50px"
            },
            {
                name: "column1",
                width: "200px"
            },
            {
                name: "column2",
                width: "200px"
            },
            {
                name: "column3",
                width: "200px"
            },
            {
                name: "column4",
                width: "200px"
            }
        ]
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Demo">
                <R.Datagrid
                    columns={this.getColumns()}
                    items={this.state.items}
                    rowTempate={DataGridRowTempate}
                    rowDataChanged={this.rowDataChanged.bind(this)}
                />
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
设置数据源
this.state = {
    items: [
        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" },
        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" },
        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" }
    ]
}
设置columns
getColumns() {
    return [
        {
            width: "30px",
            template: (
                <input
                    type="checkbox"
                    checked={this.state.isSelectAll}
                    onChange={this.handleIsSelectAllChanged.bind(this)}
                />
            )
        },
        {
            name: "action",
            width: "50px"
        },
        {
            name: "column1",
            width: "200px"
        },
        {
            name: "column2",
            width: "200px"
        },
        {
            name: "column3",
            width: "200px"
        },
        {
            name: "column4",
            width: "200px"
        }
    ]
}

触发回调
rowDataChanged(e, args) {
    var action = args.actionType;
    switch (action) {
        case "checked":
            console.log(args);
            break;
        case "click":
            console.log(args);
            break;
        default:
            break;
    }
}

渲染组件
render(){
    return <React.Fragment>
        <R.Datagrid
            columns={this.getColumns()}
            items={this.state.items}
            rowTempate={DataGridRowTempate}
            rowDataChanged={this.rowDataChanged.bind(this)}
        />
    </React.Fragment>
}

定义row template
class DataGridRowTempate extends R.DataGridRow {
    constructor(props) {
        super(props);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
        this.handleBtnClickHandler = this.handleBtnClickHandler.bind(this);
    }

    handleCheckboxChanged(e) {
        this.trigger("rowDataChanged", e, {
            actionType: "checked"
        });
    }

    handleBtnClickHandler(e) {
        this.trigger("rowDataChanged", e, {
            actionType: "click"
        });
    }

    render() {
        var data = this.props.rowDate;
        return (
            <div role="table-body-row" data-part="row">
                <div data-part="cell">
                    <input type="checkbox" onChange={this.handleCheckboxChanged} />
                </div>
                <div data-part="cell">
                    <button onClick={this.handleBtnClickHandler}>Click</button>
                </div>
                <div data-part="cell">{data.text0}</div>
                <div data-part="cell">{data.text1}</div>
                <div data-part="cell">{data.text2}</div>
                <div data-part="cell">{data.text3}</div>
            </div>
        );
    }
}

                        `
                        }
                    </code>
                </pre>
            </Stackpanel>
            <h1>Callback</h1>
            <Stackpanel text="Callback">
                {this.props.renderCallback([
                    {
                        name: 'rowDataChanged',
                        description: '下拉选项选中触发回掉函数。args {AUI.Event}: 控件自定义参数。',
                        params: [
                            {
                                name: 'args.oldValue {Object}:',
                                description: '前一个选中项对应的数据。'
                            },
                            {
                                name: 'args.newValue  {Object}:',
                                description: '当前选中项对应的数据。'
                            }
                        ]
                    }
                ])}
            </Stackpanel>
            <h1>API</h1>
            <Stackpanel text="API">
                <R.Datagrid
                    columns={this.props.aPIDataGridColumns}
                    items={[
                        {
                            text0: "columns",
                            text1: "Array",
                            text2: "[]",
                            text3: "设置DataGrid的columns"
                        },
                        {
                            text0: "items",
                            text1: "Array",
                            text2: "[]",
                            text3: "设置DataGrid的数据源"
                        },
                        {
                            text0: "rowTempate",
                            text1: "R.DataGridRow",
                            text2: "[]",
                            text3: "设置DataGrid中Row的数据格式"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}

class DataGridRowTempate extends R.DataGridRow {
    constructor(props) {
        super(props);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
        this.handleBtnClickHandler = this.handleBtnClickHandler.bind(this);
    }

    handleCheckboxChanged(e) {
        this.trigger("rowDataChanged", e, {
            actionType: "checked"
        });
    }

    handleBtnClickHandler(e) {
        this.trigger("rowDataChanged", e, {
            actionType: "click"
        });
    }

    render() {
        var data = this.props.rowDate;
        return (
            <div role="table-body-row" data-part="row">
                <div data-part="cell">
                    <input type="checkbox" onChange={this.handleCheckboxChanged} />
                </div>
                <div data-part="cell">
                    <button onClick={this.handleBtnClickHandler}>Click</button>
                </div>
                <div data-part="cell">{data.text0}</div>
                <div data-part="cell">{data.text1}</div>
                <div data-part="cell">{data.text2}</div>
                <div data-part="cell">{data.text3}</div>
            </div>
        );
    }
}