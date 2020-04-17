import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class MessageBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
    }

    messageBtnClick() {
        this.setState({
            status: !this.state.status
        })
    }

    render() {
        return <div>
            <h1>Demo</h1>
            <Stackpanel text="Demo">
                <R.MessageBar
                    show={true}
                    type='success'
                    msg='success message.'
                />
                <R.MessageBar
                    show={true}
                    type='error'
                    msg='error message.'
                />
                <R.MessageBar
                    show={true}
                    type='info'
                    msg='info message.'
                />
                <R.MessageBar
                    show={true}
                    type='warn'
                    msg='warn message.'
                />
                <R.MessageBar
                    show={this.state.status}
                    type='success'
                    msg='demo message.'
                />
                <button onClick={this.messageBtnClick.bind(this)}>Click</button>
            </Stackpanel>
            <h1>Demo Code</h1>
            <Stackpanel text="Demo Code">
                <pre>
                    <code>
                        {
                            `
渲染组件
render(){
    return <React.Fragment>
        <R.MessageBar
            show={this.state.status}
            type='success'
            msg='demo message.'
        />
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
                            text0: "show",
                            text1: "bool",
                            text2: "true/false",
                            text3: "messagebar显隐控制"
                        },
                        {
                            text0: "type",
                            text1: "string",
                            text2: "success/error/info/warn",
                            text3: "messagebar的类型"
                        },
                        {
                            text0: "msg",
                            text1: "string",
                            text2: "N/A",
                            text3: "messagebar的内容"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}
