import React from 'react';
import Layout from '../../Layouts/Layout';

export default class MarkDown extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initEditer();
    }

    initEditer() {
        var testEditor;
        testEditor = editormd.markdownToHTML("read-editormd", {
            markdown: 'aasa',
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            emoji: true,
            taskList: true,
            tex: true,  // 默认不解析
            flowChart: true,  // 默认不解析
            sequenceDiagram: true,  // 默认不解析
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
            <div style={{ textAlign: ' center' }}>
                <RButton text="返回" style={{ width: '200px' }} onClick={this.props.cancel}></RButton>
            </div>
        </React.Fragment>
    }
}