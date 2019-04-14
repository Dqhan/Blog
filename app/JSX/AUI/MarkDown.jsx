import React from 'react';
import Layout from '../../Layouts/Layout';

export default class MarkDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    componentDidMount() {
        this.initEditer();
    }

    initEditer() {
        var testEditor;
        testEditor = editormd.markdownToHTML("read-editormd", {
            markdown: this.state.data.content,
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            emoji: true,
            taskList: true,
            tex: true,  // 默认不解析
            flowChart: true,  // 默认不解析
            sequenceDiagram: true,  // 默认不解析
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            // imageUploadURL : "../src/",//注意你后端的上传图片服务地址
            
            //editorTheme: "pastel-on-dark",//编辑器的主题颜色
            theme: "gray",//顶部的主题
            previewTheme: "dark"//显示的主题
        });
        testEditor.getMarkdown();
    }

    render() {
        return <React.Fragment>
            <div id="layout" className="editor">
                <div id="read-editormd">
                    <textarea></textarea>
                </div>
            </div>
        </React.Fragment>
    }
}