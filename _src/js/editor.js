import React from 'react';
import marked from 'marked';
import highlight from "highlight.js";
import classNames from 'classnames';
import style from '../css/style.css';
import '../css/highlight.css';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

class Eidtor extends React.Component {
    static propTypes = {
        content: React.PropTypes.string.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            panelClass: 'mod-panel',
            mode: 'split',
            isFullScreen: false,
            theme:'light',
            content: marked(this.props.content || '')
        }
    }
    render() {
        const panelClass=classNames([ 'mod-panel', 'clearfix',{ 'fullscreen': this.state.isFullScreen },{ 'dark': this.state.mode === 'dark'} ]);
        const editorClass = classNames([ 'mod-editor', { 'main-mode': this.state.mode === 'edit' } ]);
        const previewClass = classNames([ 'mod-preview','markdown-body',{ 'hidden': this.state.mode === 'edit','main-mode': this.state.mode === 'preview'} ]);
        return (
            <div className={panelClass}>
                <div className="mod-tool">
                    {this.toolbar()}
                    <ul className="preview-toolbar">

                    </ul>
                </div>
                <div className={editorClass}>
                    <textarea name="content" ref="editor" onChange={()=>this.handleChange()}></textarea>
                </div>
                <div className={previewClass} dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
            </div>
        );
    }
    handleChange () {
        this.setState({ content: marked(this.refs.editor.value) });
    }
    toolbar(){
       return(
           <ul className="edit-toolbar clearfix">
             <li className="tb-btn"><a title="加粗"><i className="fa fa-bold"></i></a></li>
             <li className="tb-btn"><a title="斜体"><i className="fa fa-italic"></i></a></li>
             <li className="tb-btn"><a title="链接"><i className="fa fa-link"></i></a></li>
             <li className="tb-btn"><a title="引用"><i className="fa fa-quote-left"></i></a></li>
             <li className="tb-btn"><a title="代码段"><i className="fa fa-code"></i></a></li>
             <li className="tb-btn"><a title="图片"><i className="fa fa-picture-o"></i></a></li>
             <li className="tb-btn"><a title="有序列表"><i className="fa fa-list-ol"></i></a></li>
             <li className="tb-btn"><a title="无序列表"><i className="fa fa-list-ul"></i></a></li>
             <li className="tb-btn"><a title="标题" ><i className="fa fa-header"></i></a></li>
           </ul>
       )
    }
}
export default Eidtor;