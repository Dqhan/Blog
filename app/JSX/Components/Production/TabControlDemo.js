import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class TabControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabItems: [{ title: "tab1" }, { title: "tab2" }, { title: "tab3" }],
            selectedTabIndex: 0
        }
    }

    selectChanged(e, args) {
        console.log(args);
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="TabControl Default">
                <R.TabControl
                    type='default'
                    items={this.state.tabItems}
                    selectedIndex={this.state.selectedTabIndex}
                    selectChanged={this.selectChanged.bind(this)}
                >
                    <div>content 1</div>
                    <div>content 2</div>
                    <div>content 3</div>
                </R.TabControl>
            </Stackpanel>
            <Stackpanel text="TabControl Vertical">
                <R.TabControl
                    type='vertical'
                    items={this.state.tabItems}
                    selectedIndex={this.state.selectedTabIndex}
                    selectChanged={this.selectChanged.bind(this)}
                >
                    <div>content 1</div>
                    <div>content 2</div>
                    <div>content 3</div>
                </R.TabControl>
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
设置数据源
this.state = {
    tabItems: [{ title: "tab1" }, { title: "tab2" }, { title: "tab3" }],
}

设置默认索引
this.state = {
    selectedTabIndex: 0
}

触发回调
selectChanged(e, args) {
    console.log("Selections: ", args.newValue);
}

渲染组件
render(){
    return <React.Fragment>
        <R.TabControl
            type='default'
            items={this.state.tabItems}
            selectedIndex={this.state.selectedTabIndex}
            selectChanged={this.selectChanged.bind(this)}
        >
            <div>content 1</div>
            <div>content 2</div>
            <div>content 3</div>
        </R.TabControl>
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
                        name: 'selectChanged',
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
                            text2: "default",
                            text3: "tabcontrol形式类型"
                        },
                        {
                            text0: "items",
                            text1: "array",
                            text2: "[]",
                            text3: "tab元数据"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}
