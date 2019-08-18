import Layout from '../../../Layouts/Layout';

export default class Production extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
        this.paramseterColumn = [
            {
                name: "参数",
                width: "200px"
            },
            {
                name: "类型",
                width: "200px"
            },
            {
                name: "含义",
                width: "400px"
            }
        ]
    }

    initState() {
        this.state = {
            dialogStatus: false,

            selectItem0: null,
            selectItem1: null,

            tabItems: [{ title: "tab1" }, { title: "tab2" }, { title: "tab3" }],
            selectedTabIndex: 0,

            pageSize: 10,
            selectedPage: 1,

            isSelectAll: false
        };
        return this;
    }

    initBind() {
        this.dialogCloseHandler = this.dialogCloseHandler.bind(this);
        this.dialogShowHandler = this.dialogShowHandler.bind(this);
        this.tabSelectChangedHandler = this.tabSelectChangedHandler.bind(this);
    }

    componentDidMount() {

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

    showLoadingHandler() {
        $$.loading(true);
    }

    hideLoadingHanlder() {
        $$.loading(false);
    }

    tabSelectChangedHandler(e, args) {
        console.log(args);
    }

    pagerChangedHandler(e, args) {
        this.setState({
            selectedPage: args.newValue
        });
    }

    rowDataChangedHandler(e, args) {
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

    showTipBtnClick() {
        $$.conform({
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
        return <React.Fragment>
            <Layout
                history={this.props.history}
                logo="UI Framework|Dqhan's Blog"
            >
                <div className='product'>
                    <div className='production-container'>
                        <h3 className='product-title'>
                            UI Framework
                            <i className="light"></i>
                        </h3>
                        <section>
                            <h4>Loading</h4>
                            <p>展示loading</p>
                            <div className="production-container-cell">
                                <pre>
                                    {
`$$.loading(true);`
                                    }
                                </pre>
                            </div>
                            <p>隐藏loading</p>
                            <div className="production-container-cell">
                                <pre>
                                    {
`$$.loading(false);`
                                    }
                                </pre>
                            </div>
                            <button
                                style={{ position: "relative", zIndex: "100000000" }}
                                onClick={this.showLoadingHandler.bind(this)}
                            >
                                show
                                </button>
                            <button
                                style={{ position: "relative", zIndex: "100000000" }}
                                onClick={this.hideLoadingHanlder.bind(this)}
                            >
                                hide
                                 </button>
                                 <hr></hr>
                        </section>
                        <section>
                            <h4>Dialog</h4>
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.Dialog
    id={"dqhan-dialog"}
    width={200}
    height={300}
    status={this.state.dialogStatus}
    foot={[
        {
            text: "close",
            click: this.dialogCloseHandler
        }
    ]}
>
    <div>contain1</div>
    <div>contain2</div>
</$$.Dialog>`
                                    }
                                </pre>
                            </div>
                            <p>参数设置</p>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "id",
                                            type: "string",
                                            comments: "设置dialog的id"
                                        },
                                        {
                                            param: "width",
                                            type: "int",
                                            comments: "设置dialog的宽度"
                                        },
                                        {
                                            param: "height",
                                            type: "int",
                                            comments: "设施dialog的高度"
                                        },
                                        {
                                            param: "status",
                                            type: "布尔型",
                                            comments: "设置dialog的显示状态"
                                        },
                                        {
                                            param: "foot",
                                            type: "数组",
                                            comments: "设置dialog的button"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <button onClick={this.dialogShowHandler}>Dialog</button>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>Combobox</h4>
                            <div style={{ display: "inline-block" }}>
                                <$$.Combobox
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
                            <div style={{ display: "inline-block" }}>
                                <$$.Combobox
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
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.Combobox
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
    selectedItem={this.state.selectItem}
    selectionChanged={this.comboboxSelection1Changed.bind(this)}
/>`
                                    }
                                </pre>
                            </div>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "items",
                                            type: "array",
                                            comments: "设置下拉数据源，参数形式"
                                        },
                                        {
                                            param: "selectedItem",
                                            type: "object",
                                            comments: "设置下拉默项 参数形式：{name:'',value:''}"
                                        },
                                        {
                                            param: "selectionChanged",
                                            type: "function",
                                            comments: "下拉事件callback函数"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>TabControl</h4>
                            <$$.TabControl
                                items={this.state.tabItems}
                                selectedIndex={this.state.selectedTabIndex}
                                selectChanged={this.tabSelectChangedHandler}
                            >
                                <div>contant1</div>
                                <div>contant2</div>
                                <div>contant3</div>
                            </$$.TabControl>
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.TabControl
    items={this.state.tabItems}
    selectedIndex={this.state.selectedTabIndex}
    selectChanged={this.tabSelectChangedHandler}
    >
    <div>contant1</div>
    <div>contant2</div>
    <div>contant3</div>
</$$.TabControl>`
                                    }
                                </pre>
                            </div>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "items",
                                            type: "array",
                                            comments: "TabControl的数据源"
                                        },
                                        {
                                            param: "selectedIndex",
                                            type: "object",
                                            comments: "TabControl选中项"
                                        },
                                        {
                                            param: "selectionChanged",
                                            type: "function",
                                            comments: "TabControl事件callback函数"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>Pager</h4>
                            <$$.Pager
                                pageSize={this.state.pageSize}
                                pageCount={2}
                                selectedPage={this.state.selectedPage}
                                selectedPageChanged={this.pagerChangedHandler.bind(this)}
                            />
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.Pager
    pageSize={this.state.pageSize}
    pageCount={this.state.pageCount}
    selectedPage={this.state.selectedPage}
    selectedPageChanged={this.pagerChangedHandler.bind(this)}
/>`
                                    }
                                </pre>
                            </div>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "pageSize",
                                            type: "int",
                                            comments: "设置pager的limit"
                                        },
                                        {
                                            param: "pageCount",
                                            type: "int",
                                            comments: "设置pager的数量"
                                        },
                                        {
                                            param: "selectedPage",
                                            type: "int",
                                            comments: "pager选中项"
                                        },
                                        {
                                            param: "selectedPage",
                                            type: "function",
                                            comments: "pager事件callback函数"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>MessageBar</h4>
                            <$$.MessageBar
                                show={true}
                                type="success"
                                msg="success message."
                            />
                            <$$.MessageBar
                                show={true}
                                type="error"
                                msg="error message."
                            />
                            <$$.MessageBar
                                show={true}
                                type="info"
                                msg="info message."
                            />
                            <$$.MessageBar
                                show={true}
                                type="warn"
                                msg="warn message."
                            />
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.MessageBar
    show={true}
    type="success"
    msg="success message."
/>
<$$.MessageBar
    show={true}
    type="error"
    msg="error message."
/>
<$$.MessageBar
    show={true}
    type="info"
    msg="info message."
/>
<$$.MessageBar
    show={true}
    type="warn"
    msg="warn message."
/>`
                                    }
                                </pre>
                            </div>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "show",
                                            type: "bool",
                                            comments: "MessageBar显隐控制"
                                        },
                                        {
                                            param: "type",
                                            type: "string",
                                            comments: "设置MessageBar类型"
                                        },
                                        {
                                            param: "msg",
                                            type: "string",
                                            comments: "设置MessageBar类型"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>PeoplePicker</h4>
                            <$$.PeoplePicker
                                items={[
                                    { userId: 0, name: "dqhan0", age: 18, sex: "female" },
                                    { userId: 1, name: "dqhan1", age: 19, sex: "male" },
                                    { userId: 2, name: "dqhan2", age: 20, sex: "male" },
                                    { userId: 3, name: "dqhan3", age: 21, sex: "female" }
                                ]}
                                selectedItem={{ id: 2, name: "dqhan2" }}
                            />
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.PeoplePicker
    items={[
        { userId: 0, name: "dqhan0", age: 18, sex: "female" },
        { userId: 1, name: "dqhan1", age: 19, sex: "male" },
        { userId: 2, name: "dqhan2", age: 20, sex: "male" },
        { userId: 3, name: "dqhan3", age: 21, sex: "female" }
    ]}
    selectedItems={{ id: 2, name: "dqhan2" }}
/>        `                              
                                    }
                                </pre>
                            </div>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "items",
                                            type: "array",
                                            comments: "PeoplePicker数据源"
                                        },
                                        {
                                            param: "selectedItems",
                                            type: "array",
                                            comments: "设置选中项"
                                        },
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>Processer</h4>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>Table</h4>
                            <$$.Table
                                columns={[
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
                                    {name: "action", width: "50px"},
                                    { name: "column1",width: "200px"},
                                    {name: "column2", width: "200px"},
                                    { name: "column3",width: "200px" },
                                    {  name: "column4",width: "200px"}
                                ]}
                                items={[
                                    {text0: "text0",text1: "text1", text2: "text2",text3: "text3"},
                                    { text0: "text0",text1: "text1", text2: "text2", text3: "text3" },
                                    { text0: "text0", text1: "text1", text2: "text2", text3: "text3" }
                                ]}
                                rowTempate={RowTempate}
                                rowDataChanged={this.rowDataChangedHandler.bind(this)}
                            />
                            <div className="production-container-cell">
                                <pre>
                                    {
`<$$.Table
    columns={[
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
        { name: "action", width: "50px" },
        { name: "column1", width: "200px" },
        { name: "column2", width: "200px" },
        { name: "column3", width: "200px" },
        { name: "column4", width: "200px" }
    ]}
    items={[
        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" },
        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" },
        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" }
    ]}
    rowTempate={RowTempate}
    rowDataChanged={this.rowDataChangedHandler.bind(this)}
/>
/**
 * RowTempate设置方式
*/
class RowTempate extends $$.DataGridRow {
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
                                </pre>
                            </div>
                            <div className="production-container-param">
                                <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "columns",
                                            type: "array",
                                            comments: "设置Table的columns"
                                        },
                                        {
                                            param: "items",
                                            type: "array",
                                            comments: "设置Table的数据源"
                                        },
                                        {
                                            param: "rowTempate",
                                            type: "$$.DataGridRow",
                                            comments: "设置Table每一行的格式"
                                        },
                                        {
                                            param: "rowDataChanged",
                                            type: "function",
                                            comments: "事件触发callback函数"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>TipConform</h4>
                            <button onClick={this.showTipBtnClick.bind(this)}>show</button>
                            <div className="production-container-cell">
                                <pre>
                                    {
`$$.conform({
    message: "tip message.",
    footer: true,
    handleClick: this.tipConformHandleClick.bind(this)
});`
                                    }
                                </pre>
                            </div>
                            <div className="production-container-param">
                            <$$.Table
                                    columns={this.paramseterColumn}
                                    items={[
                                        {
                                            param: "message",
                                            type: "string",
                                            comments: "设置conform内容"
                                        },
                                        {
                                            param: "footer",
                                            type: "bool",
                                            comments: "控制button显示"
                                        },
                                        {
                                            param: "handleClick",
                                            type: "function",
                                            comments: "事件触发callback函数"
                                        }
                                    ]}
                                    rowTempate={ParamseterRowTempate}
                                />
                            </div>
                            <hr></hr>
                        </section>
                        <section>
                            <h4>Validation</h4>
                            <hr></hr>
                        </section>
                    </div>
                </div>
            </Layout>
        </React.Fragment >
    }
}


class RowTempate extends $$.DataGridRow {
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


class ParamseterRowTempate extends $$.DataGridRow {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.rowDate;
        return (
            <div role="table-body-row" data-part="row">
                <div data-part="cell">{data.param}</div>
                <div data-part="cell">{data.type}</div>
                <div data-part="cell">{data.comments}</div>
            </div>
        );
    }
}
