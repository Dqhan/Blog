import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Combobox extends React.Component {
    constructor(props) {
        super(props);
    }

    showLoadingHandler() {
        R.loading(true);
    }

    hideLoadingHanlder() {
        R.loading(false);
    }

    showLoadingHandler0() {
        R.loading(true, "loading0");
    }

    hideLoadingHanlder0() {
        R.loading(false, "loading0");
    }

    showLoadingHandler1() {
        R.loading(true, "loading1");
    }

    hideLoadingHanlder1() {
        R.loading(false, "loading1");
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Demo">
                <button
                    style={{ position: "relative", zIndex: "100000000" }}
                    onClick={this.showLoadingHandler.bind(this)}
                >
                    show loading
                </button>
                <button
                    style={{ position: "relative", zIndex: "100000000" }}
                    onClick={this.hideLoadingHanlder.bind(this)}
                >
                    hide loading
                </button>
                <h4>Element Loading</h4>
                <div id="loading0" style={{ width: "200px", height: "200px" }}></div>
                <button
                    style={{ position: "relative", zIndex: "100000000" }}
                    onClick={this.showLoadingHandler0.bind(this)}
                >
                    show element loading
                </button>
                <button
                    style={{ position: "relative", zIndex: "100000000" }}
                    onClick={this.hideLoadingHanlder0.bind(this)}
                >
                    hide element loading
                </button>
                <div id="loading1" style={{ width: "200px", height: "200px" }}></div>
                <button
                    style={{ position: "relative", zIndex: "100000000" }}
                    onClick={this.showLoadingHandler1.bind(this)}
                >
                    show element loading
                </button>
                <button
                    style={{ position: "relative", zIndex: "100000000" }}
                    onClick={this.hideLoadingHanlder1.bind(this)}
                >
                    hide element loading
                </button>
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
设置数据源
generateItems(num) {
    let items = [],
        i = 0;
    for (; i < num; i++) {
        var item = R.generateRow();
        item.name = item.firstName + " " + item.lastName;
        if (i === 0)
            item.name = '<button onClick="javascript:alert(123);">Click me</button>';
        items.push(item);
    }
    return items;
}

触发回调
selectionChanged(e, args) {
    console.log("Selections: ", args.newValue);
}

渲染组件
render(){
    return <React.Fragment>
        <R.RichCombobox
            items={this.generateItems(15)}
            selectionChanged={this.selectionChanged.bind(this)}
        />
    </React.Fragment>
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
                        name: 'selectionChanged',
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
                            text0: "items",
                            text1: "Array",
                            text2: "[]",
                            text3: "RichCombobox的数据源"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}