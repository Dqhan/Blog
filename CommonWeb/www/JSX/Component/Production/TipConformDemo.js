import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Combobox extends React.Component {
    constructor(props) {
        super(props);
    }

    showTipBtnClick() {
        R.conform({
            message: "tip message.",
            status: "show",
            footer: true,
            handleClick: this.tipConformHandleClick.bind(this)
        });
    }

    tipConformHandleClick() {
        var self = this;
    }


    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Demo">
                <button onClick={this.showTipBtnClick.bind(this)}>Tip Conform</button>
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
R.conform(
    {
        message: "tip message.",
        footer: true,
        handleClick: this.tipConformHandleClick.bind(this)
    }
);
                        `
                        }
                    </code>
                </pre>
            </Stackpanel>
            <h1>Callback</h1>
            <Stackpanel text="Callback">
                {this.props.renderCallback([
                    {
                        name: 'tipConformHandleClick',
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
                            text0: "message",
                            text1: "[object String]",
                            text2: "",
                            text3: "tip 内容"
                        },
                        {
                            text0: "footer",
                            text1: "[object Bool]",
                            text2: "[]",
                            text3: "tip button显隐"
                        },
                        {
                            text0: "handleClick",
                            text1: "[object Function]",
                            text2: "[]",
                            text3: "tip button事件函数"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}