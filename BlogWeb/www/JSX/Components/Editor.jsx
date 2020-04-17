export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkTypeList: [],
            checkType: {
                Javascript: false,
                Typescript: false,
                Es6: false,
                SJModule: false,
                Webpack: false,
                Node: false,
                React: false,
                Web: false
            }
        }
        this.initBind();
        this.testEditor = null;
    }

    initBind() {
        this.saveArticle = this.saveArticle.bind(this);
        this.handleTagChecked = this.handleTagChecked.bind(this);
    }

    componentDidMount() {
        this.initEditer();
    }

    initEditer() {
        this.testEditor = editormd("write-editormd", {
            placeholder: '开始',  //默认显示的文字，这里就不解释了
            width: "100%",
            height: 640,
            syncScrolling: "single",
            path: "editor/lib/",   //你的path路径（原资源文件中lib包在我们项目中所放的位置）
            theme: "dark",//工具栏主题
            previewTheme: "dark",//预览主题
            editorTheme: "pastel-on-dark",//编辑主题
            saveHTMLToTextarea: true,
            emoji: false,
            taskList: true,
            tocm: true,         // Using [TOCM]
            tex: true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart: true,             // 开启流程图支持，默认关闭
            sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
            toolbarIcons: function () {  //自定义工具栏，后面有详细介绍
                return editormd.toolbarModes['simple']; // full, simple, mini
            },
            /**上传图片相关配置如下*/
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "./document/api/upload"
        });
    }


    saveArticle() {
        let content = this.testEditor.getMarkdown(),
            data = {
                title: content.split('\n')[0],
                content: content,
                time: new Date().getTime(),
                author: "Dqhan",
                viewCount: 1,
                tags: this.getTags()
            },
            option = {
                url: './blog/api/addarticle',
                method: 'POST',
                body: data
            }
        fetchUtility(option).then(res => {
            // this.props.cancel();
            console.dir(res);
        }).catch(e => {
            console.log(e);
        })
    }

    getTags() {
        var result = [];
        if (this.state.checkType.Javascript) result.push(Util.TAG_TYPE.Javascript);
        if (this.state.checkType.Typescript) result.push(Util.TAG_TYPE.Typescript);
        // if (this.state.checkType.Es6) result.push(Util.TAG_TYPE.Es6);
        if (this.state.checkType.SJModule) result.push(Util.TAG_TYPE.SJModule);
        if (this.state.checkType.Webpack) result.push(Util.TAG_TYPE.Webpack);
        if (this.state.checkType.Node) result.push(Util.TAG_TYPE.Node);
        if (this.state.checkType.React) result.push(Util.TAG_TYPE.React);
        if (this.state.checkType.Web) result.push(Util.TAG_TYPE.Web);
        return result;
    }

    handleTagChecked(e) {
        var
            self = this,
            clr = {
                "Javascript": function (e) {
                    self.state.checkType.Javascript = e.target.checked;
                    self.setState(self.state);
                },
                "Typescript": function (e) {
                    self.state.checkType.Typescript = e.target.checked;
                    self.setState(self.state);
                },
                // "Es6": function (e) {
                //     self.state.checkType.Es6 = e.target.checked;
                //     self.setState(self.state);
                // },
                "SJModule": function (e) {
                    self.state.checkType.SJModule = e.target.checked;
                    self.setState(self.state);
                },
                "Webpack": function (e) {
                    self.state.checkType.Webpack = e.target.checked;
                    self.setState(self.state);
                },
                "Node": function (e) {
                    self.state.checkType.Node = e.target.checked;
                    self.setState(self.state);
                },
                "React": function (e) {
                    self.state.checkType.React = e.target.checked;
                    self.setState(self.state);
                },
                "Web": function (e) {
                    self.state.checkType.Web = e.target.checked;
                    self.setState(self.state);
                }
            };
        clr[e.target.name](e);
    }

    render() {
        return <React.Fragment>
            <div id="layout" className="editor">
                <div id="write-editormd">
                    <textarea></textarea>
                </div>
            </div>
            <section>
                <label>
                    <input type="checkbox" name="Javascript" checked={this.state.checkType.Javascript} onChange={this.handleTagChecked} />
                    Javascript
                </label>
                <label>
                    <input type="checkbox" name="Typescript" checked={this.state.checkType.TypescriptCss} onChange={this.handleTagChecked} />
                    Typescript
                </label>
                {/* <label>
                    <input type="checkbox" name="Css" checked={this.state.checkType.Es6} onChange={this.handleTagChecked} />
                    Es6
                </label> */}
                <label>
                    <input type="checkbox" name="SJModule" checked={this.state.checkType.SJModule} onChange={this.handleTagChecked} />
                    设计模式
                </label>
                <label>
                    <input type="checkbox" name="Webpack" checked={this.state.checkType.Webpack} onChange={this.handleTagChecked} />
                    Webpack
                </label>
                <label>
                    <input type="checkbox" name="Node" checked={this.state.checkType.Node} onChange={this.handleTagChecked} />
                    Node
                </label>
                <label>
                    <input type="checkbox" name="React" checked={this.state.checkType.React} onChange={this.handleTagChecked} />
                    React
                </label>
                <label>
                    <input type="checkbox" name="Web" checked={this.state.checkType.Web} onChange={this.handleTagChecked} />
                    Web
                </label>
            </section>
            <div style={{ textAlign: ' center' }}>
                <RButton text="提交" style={{ width: '200px', margin: '0 10px' }} onClick={this.saveArticle}></RButton>
                <RButton text="返回" style={{ width: '200px' }} onClick={this.props.cancel}></RButton>
            </div>
        </React.Fragment>
    }
}