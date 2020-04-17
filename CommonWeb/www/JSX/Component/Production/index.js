require('./production.less');
import Combobox from './ComboboxDemo';
import RichCombobx from './RichComboboxDemo';
import PeoplePicker from './PeoplePickerDemo';
import Processer from './ProcesserDemo';
import Searchbox from './SearchBoxDemo';
import Dialog from './DialogDemo';
import TabControl from './TabControlDemo';
import Pager from './PagerDemo';
import MessageBar from './MessageBarDemo';
import DataGrid from './DataGridDemo';
import TipConform from './TipConformDemo';
import Loading from './LoadingDemo';

const handlers = [
    'tabSelectChangedHandler'
]

const aPIDataGridColumns = [
    {
        name: "参数名",
        width: "50px"
    },
    {
        name: "类型",
        width: "200px"
    },
    {
        name: "默认值",
        width: "200px"
    },
    {
        name: "描述",
        width: "200px"
    }
]

export default class Production extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    initState() {
        this.state = {
            tabItems: [
                { title: 'Combobox', template: '<span class="step">1</span><span>Combobox</span>' },
                { title: 'Rich Combobox', template: '<span class="step">2</span><span>Rich Combobox</span>' },
                { title: 'PeoplePicker', template: '<span class="step">3</span><span>PeoplePicker</span>' },
                { title: 'Processer', template: '<span class="step">4</span><span>Processer</span>' },
                { title: 'Searchbox', template: '<span class="step">5</span><span>Searchbox</span>' },
                { title: 'Dialog', template: '<span class="step">6</span><span>Dialog</span>' },
                { title: 'TabControl', template: '<span class="step">7</span><span>TabControl</span>' },
                { title: 'Pager', template: '<span class="step">8</span><span>Pager</span>' },
                { title: 'MessageBar', template: '<span class="step">9</span><span>MessageBar</span>' },
                { title: 'DataGrid', template: '<span class="step">10</span><span>DataGrid</span>' },
                { title: 'TipConform', template: '<span class="step">11</span><span>TipConform</span>' },
                { title: 'Loading', template: '<span class="step">12</span><span>Loading</span>' }
            ],
            selectedTabIndex: 0
        };
        return this;
    }

    initBind() {
        handlers.forEach(element => {
            this[element] = this[element].bind(this);
        });
    }

    componentDidMount() {

    }

    tabSelectChangedHandler(e, args) {
        console.log(args);
    }

    render() {
        return <React.Fragment>
            <R.Layout
                history={this.props.history}
                logo="UI Framework|Dqhan' s Blog"
            >
                <div className='production-content'>
                    <R.TabControl
                        type='vertical'
                        items={this.state.tabItems}
                        selectedIndex={this.state.selectedTabIndex}
                        selectChanged={this.tabSelectChangedHandler}
                    >
                        <Combobox
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <RichCombobx
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <PeoplePicker
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <Processer
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <Searchbox
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <Dialog
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <TabControl
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <Pager
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <MessageBar
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <DataGrid
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <TipConform
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                        <Loading
                            aPIDataGridColumns={aPIDataGridColumns}
                            renderCallback={renderCallback}
                        />
                    </R.TabControl>
                </div>
            </R.Layout>
        </React.Fragment>
    }
}

function renderCallback(items) {
    return items.map((item, i) => {
        return <div key={`callback-handler-${i}`} className='handler-callback-content'>
            <div className='handler-callback-content-title'>{item.name}</div>
            <div className='handler-callback-content-desc'>{item.description}</div>
            <ul className='handler-callback-content-params-content'>
                {
                    item.params.map((param, index) => {
                        return <li key={`callback-handler-${i}-params-${index}`} className='handler-callback-content-item fi-page-triangle-right-as'>
                            <span className='handler-callback-content-item-title'></span>{param.name}
                            <span className='handler-callback-content-item-desc'></span>{param.description}
                        </li>
                    })
                }
            </ul>
        </div>
    })
}

