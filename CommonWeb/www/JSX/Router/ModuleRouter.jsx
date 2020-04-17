import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

class LazyLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            module: null
        };
    }

    componentWillMount() {
        this.load(this.props.module, this.props.path);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.module != this.props.module) {
            this.setState({ module: null });
            this.load(nextProps.module, nextProps.path);
        }
    }

    load(module, path) {
        // var
        //     cssPath, jsPath;
        // if (module === 'BLOG') {
        //     cssPath = [
        //         'http://localhost:3032/Lib/editor/css/editormd.css',
        //         'http://localhost:3032/Lib/editor/lib/codemirror/codemirror.min.css',
        //         'http://localhost:3032/Lib/editor/lib/codemirror/addon/dialog/dialog.css',
        //         'http://localhost:3032/Lib/editor/lib/codemirror/addon/search/matchesonscrollbar.css',
        //         'http://localhost:3032/dist/bundle.css'
        //     ];
        //     jsPath = [
        //         'http://localhost:3032/Lib/editor/lib/flowchart.min.js',
        //         'http://localhost:3032/Lib/editor/lib/jquery.flowchart.min.js',
        //         'http://localhost:3032/Lib/editor/editormd.min.js',
        //         'http://localhost:3032/Lib/editor/lib/codemirror/codemirror.min.js',
        //         'http://localhost:3032/Lib/editor/lib/marked.min.js',
        //         'http://localhost:3032/Lib/editor/lib/prettify.min.js',
        //         'http://localhost:3032/Lib/editor/lib/raphael.min.js',
        //         'http://localhost:3032/Lib/editor/lib/underscore.min.js',
        //         'http://localhost:3032/Lib/editor/lib/sequence-diagram.min.js',
        //         'http://localhost:3032/dist/bundle.js'
        //     ];
        // } else {
        //     cssPath = path + '/dist/bundle.css';
        //     jsPath = path + '/dist/bundle.js';
        // }
        var
            cssPath = path + '/dist/bundle.css',
        jsPath = path + '/dist/bundle.js';
        LazyLoad.css(cssPath);
        LazyLoad.js(jsPath, () => {
            this.setState({
                module: $Scope.Modules[module]
            });
        });
    }

    render() {
        if (!this.state.module) {
            return false;
        }
        return this.props.children(this.state.module);
    }
}

//path：子模块文件所在路径
//module：全局变量Module中，当前子模块的属性名
const HTMLModule = ({ name, path }) => {
    let param = location.param;
    location.param = null;
    let ModuleComponent = $Scope.Modules[name];
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
                <Route path='/blog' render={() => <HTMLModule name="BLOG" path={MODULE_URL.Blog} />} />
                <Route path='/overview' render={() => <HTMLModule name="OVERVIEW" path={MODULE_URL.OverView} />} />
                {/* <Route path='/production' render={() => <HTMLModule name="PROCDUCTION" path={MODULE_URL.Common} />} /> */}
                <Route path='/leavemessage' render={() => <HTMLModule name="LEAVEMESSAGE" path={MODULE_URL.LeaveMsg} />} />
                <Route path='/mark' render={() => <HTMLModule name="MARK" path={MODULE_URL.Mark} />} />
                <Route path='/verse' render={() => <HTMLModule name="VERSE" path={MODULE_URL.Verse} />} />
                {/* <Route path='/about' render={() => <HTMLModule name="ABOUT" path={MODULE_URL.Common} />} /> */}
                <Redirect from='*' to="/Error/404" />
            </Switch>
        );
    }
}

export default ModulesRouter;