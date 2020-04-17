import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class PeoplePicker extends React.Component {
    constructor(props) {
        super(props);
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
        console.log("Selections: ", args.newValue);
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Single PeoplePicker">
                <R.PeoplePicker
                    type="single"
                    selectedItems={[{ id: 2, name: "dqhan2" }]}
                    selectionChanged={this.selectionChanged.bind(this)}
                />
            </Stackpanel>
            <Stackpanel text="Multiple PeoplePicker">
                <R.PeoplePicker
                    type="multiple"
                    selectedItems={[{ id: 2, name: "dqhan2" }]}
                    selectionChanged={this.selectionChanged.bind(this)}
                />
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
触发回调
selectionChanged(e, args) {
    console.log("Selections: ", args.newValue);
}

渲染组件
render(){
    return <React.Fragment>
        <R.PeoplePicker
            type="single"
            selectedItems={[{ id: 2, name: "dqhan2" }]}
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
                            text0: "type",
                            text1: "string",
                            text2: "single",
                            text3: "设置people picker的使用类型"
                        },
                        {
                            text0: "type",
                            text1: "array",
                            text2: "[]",
                            text3: "设置people picker的选中项"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}
