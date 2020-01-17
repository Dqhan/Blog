import RowTempate from './RowTemplate';
import Stackpanel from './Stackpanel';

export default class Processer extends React.Component {
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
            <Stackpanel text="processer">
                <R.Processer processerValue="60" />
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
          <R.Processer processerValue="60" />
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
                            text0: "processerValue",
                            text1: "string",
                            text2: "100",
                            text3: "Processer的进度参数"
                        }
                    ]}
                    rowTempate={RowTempate}
                />
            </Stackpanel>
        </div>
    }
}