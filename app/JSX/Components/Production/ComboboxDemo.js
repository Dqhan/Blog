import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Combobox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            selectItem0: null,
            selectItem1: null
        }
    }

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

    selectionChanged(e, args) {
        console.dir(args.newValue);
    }

    comboboxSelection0Changed(e, args) {
        this.state.selectItem0 = args.newValue;
        if (this.state.selectItem0.value == "value1")
            this.state.selectItem1 = {
                name: "text6",
                value: "value6"
            };
        if (this.state.selectItem0.value == "value2")
            this.state.selectItem1 = {
                name: "text5",
                value: "value5"
            };
        if (this.state.selectItem0.value == "value3")
            this.state.selectItem1 = {
                name: "text4",
                value: "value4"
            };
        this.setState({});
    }

    comboboxSelection1Changed(e, args) {
        console.log(args.newValue);
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Demo">
                <R.Combobox
                    items={this.generateItems(15)}
                    selectedItem={this.state.selectedItem}
                    selectionChanged={this.selectionChanged.bind(this)}
                />
            </Stackpanel>
            <h1>联动下拉</h1>
            <Stackpanel text="联动下拉Demo">
                <div style={{ display: 'inline-block' }}>
                    <R.Combobox
                        items={[
                            {
                                name: "text1",
                                value: "value1"
                            },
                            {
                                name: "text2",
                                value: "value2"
                            },
                            {
                                name: "text3",
                                value: "value3"
                            }
                        ]}
                        selectedItem={this.state.selectItem0}
                        selectionChanged={this.comboboxSelection0Changed.bind(this)}
                    />
                </div>
                <div style={{ display: 'inline-block' }}>
                    <R.Combobox
                        items={[
                            {
                                name: "text4",
                                value: "value4"
                            },
                            {
                                name: "text5",
                                value: "value5"
                            },
                            {
                                name: "text6",
                                value: "value6"
                            }
                        ]}
                        selectedItem={this.state.selectItem1}
                        selectionChanged={this.comboboxSelection1Changed.bind(this)}
                    />
                </div>
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

设置选中项
this.state = {
    selectedItem: null
}

触发回调
selectionChanged(e, args) {
    console.log("Selections: ", args.newValue);
}

渲染组件
render(){
    return <React.Fragment>
        <R.Combobox
            items={this.generateItems(15)}
            selectedItem={this.state.selectedItem}
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
                            text3: "Combobox的数据源"
                        },
                        {
                            text0: "selectedItem",
                            text1: "object",
                            text2: "null",
                            text3: "Combobox的默认选中项"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}
