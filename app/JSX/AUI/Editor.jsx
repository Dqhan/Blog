import React from 'react';
import Layout from '../../Layouts/Layout';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initEditer();
    }

    initEditer() {
        var testEditor;
        testEditor = editormd("test-editormd", {
            placeholder: '本编辑器支持Markdown编辑，左边编写，右边预览',  //默认显示的文字，这里就不解释了
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
        });
    }

    render() {
        return <React.Fragment>
            <div id="layout" className="editor">
                <div id="test-editormd">
                    <textarea></textarea>
                </div>
            </div>
            <div style={{ textAlign: ' center' }}>
                <RButton text="返回" style={{ width: '200px' }} onClick={this.props.cancel}></RButton>
            </div>
        </React.Fragment>
    }
}