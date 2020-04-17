import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogStatus: false
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


    dialogCloseHandler() {
        this.setState({
            dialogStatus: false
        });
    }

    dialogShowHandler() {
        this.setState({
            dialogStatus: true
        });
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Demo">
                <button onClick={this.dialogShowHandler.bind(this)}>Dialog</button>
                <R.Dialog
                    id={"dqhan-dialog"}
                    width="800"
                    height="600"
                    status={this.state.dialogStatus}
                    foot={[
                        {
                            text: "close",
                            click: this.dialogCloseHandler.bind(this)
                        }
                    ]}
                >
                    <div>66666</div>
                    <div>66666</div>
                </R.Dialog>
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
dialog显隐的state                          
this.state = {
    dialogStatus: false
}

控制dialog显隐                      
dialogCloseHandler() {
    this.setState({
        dialogStatus: false
    });
}

dialogShowHandler() {
    this.setState({
        dialogStatus: true
    });
}

渲染组件
render(){
    return <React.Fragment>
        <button onClick={this.dialogShowHandler.bind(this)}>Dialog</button>
        <R.Dialog
            id="dqhan-dialog"
            width="800"
            height="600"
            status={this.state.dialogStatus}
            foot={[
                {
                    text: "close",
                    click: this.dialogCloseHandler.bind(this)
                }
            ]}
        >
            <div>66666</div>
            <div>66666</div>
        </R.Dialog>
    </React.Fragment>
}
                        `
                        }
                    </code>
                </pre>
            </Stackpanel>
            <h1>API</h1>
            <Stackpanel text="API">
                <R.Datagrid
                    columns={this.props.aPIDataGridColumns}
                    items={[
                        {
                            text0: "id",
                            text1: "string",
                            text2: "",
                            text3: "设置dialog的id"
                        },
                        {
                            text0: "width",
                            text1: "number",
                            text2: "",
                            text3: "设置dialog的宽度"
                        },
                        {
                            text0: "height",
                            text1: "number",
                            text2: "",
                            text3: "设置dialog的高度"
                        },
                        {
                            text0: "status",
                            text1: "bool",
                            text2: "false",
                            text3: "dialog状态控制"
                        },
                        {
                            text0: "foot",
                            text1: "Array",
                            text2: "非必填",
                            text3: "dialog提供button"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}
