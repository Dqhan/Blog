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

const HTMLModule = ({ name, path }) => {
    let param = location.param;
    location.param = null;
    let ModuleComponent = Modules[name];
    return (
        <React.Fragment>
            {
                ModuleComponent ?
                    <ModuleComponent param={param} /> :
                    <LazyLoader path={path} module={name}>
                        {(Item) => <Item param={param} />}
                    </LazyLoader>
            }           
        </React.Fragment>
    );
};


class ModulesRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path={'/Module/Target'} render={() => <HTMLModule name='Target' path={'./Module/Target'} />} />
                <Redirect from='*' to='/403' />
            </Switch>
        );
    }
}

export default ModulesRouter;