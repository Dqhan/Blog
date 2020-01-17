import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            pageCount: 10,
            selectedPage: 1
        }
    }

    pagerChangedHandler(e, args) {
        console.log("new page index: ", args.newValue);
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Pager">
                <R.Pager
                    pageSize={this.state.pageSize}
                    pageCount={this.state.pageCount}
                    selectedPage={this.state.selectedPage}
                    selectedPageChanged={this.pagerChangedHandler.bind(this)}
                />
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