import Layout from '../../../Layouts/Layout';
import Content from '../Content';

export default class Production extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
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

            msgShow: false,
            msgType: "success",
            msg: "",

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
        var banner = new window.banner.Banner({
            pDom: document.getElementById("demo"),
            dom: document.getElementById("banner")
        });
        banner.init();
        banner.render();
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

    showBanner() {
        $("#demo").css("display", "");
    }

    hideBanner() {
        $("#demo").css("display", "none");
    }

    pagerChangedHandler(e, args) {
        this.setState({
            selectedPage: args.newValue
        });
    }

    successMsgBtnClick() {
        this.setState({
            msgShow: !this.state.msgShow,
            msgType: "success",
            msg: "Success Message Bar"
        });
    }

    errorMsgBtnClick() {
        this.setState({
            msgShow: !this.state.msgShow,
            msgType: "error",
            msg: "Error Message Bar"
        });
    }

    infoMsgBtnClick() {
        this.setState({
            msgShow: !this.state.msgShow,
            msgType: "info",
            msg: "Info Message Bar"
        });
    }

    warnMsgBtnClick() {
        this.setState({
            msgShow: !this.state.msgShow,
            msgType: "warn",
            msg: "Warn Message Bar"
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
                hasHeader={true}
                hasModuleLogo={true}
                logo={'作品'}
            >
                <div className='product'>
                    <div className='product-header'>
                        <img src={require('../../../Image/productHeader.jpg')} />
                    </div>
                    <div className='production-container'>
                        <div style={{ backgroundColor: "#7f8ea0", color: "#fd6a7f" }}>
                            <h3
                                style={{
                                    display: "inline-block",
                                    textAlign: "center",
                                    width: "100%"
                                }}
                            >
                                Dqhan's UI
                            </h3>
                            <section>
                                <h4>Loading</h4>
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
                            </section>
                            <section>
                                <h4>Banner</h4>
                                <button onClick={this.showBanner.bind(this)}>show</button>
                                <button onClick={this.hideBanner.bind(this)}>hide</button>
                                <div id="demo" style={{ display: "none" }}>
                                    <div id="banner" />
                                </div>
                            </section>
                            <section>
                                <h4>Dialog</h4>
                                <button onClick={this.dialogShowHandler}>Dialog</button>
                                <$$.Dialog
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
                                    <div>66666</div>
                                    <div>66666</div>
                                </$$.Dialog>
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
                            </section>
                            <section>
                                <h4>TabControl</h4>
                                <$$.TabControl
                                    items={this.state.tabItems}
                                    selectedIndex={this.state.selectedTabIndex}
                                    selectChanged={this.tabSelectChangedHandler}
                                >
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                </$$.TabControl>
                            </section>
                            <section>
                                <h4>Pager</h4>
                                <$$.Pager
                                    pageSize={this.state.pageSize}
                                    pageCount={2}
                                    selectedPage={this.state.selectedPage}
                                    selectedPageChanged={this.pagerChangedHandler.bind(this)}
                                />
                            </section>
                            <section>
                                <h4>MessageBar</h4>
                                <$$.MessageBar
                                    show={this.state.msgShow}
                                    type={this.state.msgType}
                                    msg={this.state.msg}
                                />
                                <button onClick={this.errorMsgBtnClick.bind(this)}>error</button>
                                <button onClick={this.successMsgBtnClick.bind(this)}>success</button>
                                <button onClick={this.infoMsgBtnClick.bind(this)}>info</button>
                                <button onClick={this.warnMsgBtnClick.bind(this)}>warn</button>
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
                            </section>
                            <section>
                                <h4>Processer</h4>
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
                                        {
                                            name: "action",
                                            width: "50px"
                                        },
                                        {
                                            name: "column1",
                                            width: "200px"
                                        },
                                        {
                                            name: "column2",
                                            width: "200px"
                                        },
                                        {
                                            name: "column3",
                                            width: "200px"
                                        },
                                        {
                                            name: "column4",
                                            width: "200px"
                                        }
                                    ]}
                                    items={[
                                        {
                                            text0: "text0",
                                            text1: "text1",
                                            text2: "text2",
                                            text3: "text3"
                                        },
                                        {
                                            text0: "text0",
                                            text1: "text1",
                                            text2: "text2",
                                            text3: "text3"
                                        },
                                        { text0: "text0", text1: "text1", text2: "text2", text3: "text3" }
                                    ]}
                                    rowTempate={RowTempate}
                                    rowDataChanged={this.rowDataChangedHandler.bind(this)}
                                />
                            </section>
                            <section>
                                <h4>TipConform</h4>
                                <button onClick={this.showTipBtnClick.bind(this)}>show</button>
                            </section>
                            <section>
                                <h4>Validation</h4>
                            </section>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
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
