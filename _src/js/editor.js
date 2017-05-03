import React from 'react';
import marked from 'marked';
import highlight from "highlight.js";
import classNames from 'classnames';
import style from '../css/style.css';
import '../css/editor.css';

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
            content: marked('')
        }
    }
    render() {
        const panelClass=classNames([ 'mod-panel', 'clearfix',{ 'fullscreen': this.state.isFullScreen },{ 'dark': this.state.mode === 'dark'} ]);
        const editorClass = classNames([ 'mod-editor', { 'main-mode': this.state.mode === 'edit' } ]);
        const previewClass = classNames([ 'mod-preview','markdown-body',{ 'hidden': this.state.mode === 'edit','main-mode': this.state.mode === 'preview'} ]);
        return (
            <div className={panelClass}>
                <div className="mod-tool">
                    <ul className="edit-toolbar">
                        
                    </ul>
                    <ul className="preview-toolbar">

                    </ul>
                </div>
                <div className={editorClass}>
                    <textarea name="content" ref="editor" onChange={this.handleChange.bind(this)}></textarea>
                </div>
                <div className={previewClass} dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
            </div>
        );
    }
    handleChange () {
        this.setState({ content: marked(this.refs.editor.value) });
    }

}
export default Eidtor;