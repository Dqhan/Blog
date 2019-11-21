class LazyLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            module: null
        }
    }

    componentWillMount() {
        this.load(this.props.module, this.props.path);
    }

    componentWillReceiveProps(newProps) {
        this.load(newProps.module, newProps.path);
    }

    load(module, path) {
        let cssPath = path + '',
            jsPath = path + '';
        LazyLoad.css(cssPath);
        LazyLoad.js(jsPath, () => {
            this.state.module = Modules[module];
        })
    }

    render() {
        if (!this.state.module) return null;
        else this.props.children(this.state.module);
    }


}

const HTMLModule = (name, path) => {
    let ModuleComponent = Modules[name];
    return <React.Fragment>
        {
            ModuleComponent ? <ModuleComponent param={param} /> :
                <LazyLoader>
                    {
                        (Item) => <Item param={param} />
                    }
                </LazyLoader>
        }
    </React.Fragment>
}


export default HTMLModule;