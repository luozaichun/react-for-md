import React from 'react';
import marked from 'marked';
import highlight from "highlight.js";
import classNames from 'classnames';

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
    constructor(props){
        super(props);
        this.state = {
            panelClass: 'mod-panel',
            mode: 'split',
            isFullScreen: false,
            theme:false
        }
    }
    componentDidMount() {
        window.addEventListener('onKeyDown ', this.tooggleFullScreen)
    }
    render() {
        const panelClass=classNames([ 'mod-panel', 'clearfix',{ 'fullscreen': this.state.isFullScreen },{ 'dark': this.state.theme} ]);
        const editorClass = classNames([ 'mod-editor', { 'main-mode': this.state.mode === 'edit','hidden': this.state.mode === 'preview'} ]);
        const previewClass = classNames([ 'mod-preview',{ 'hidden': this.state.mode === 'edit','main-mode': this.state.mode === 'preview'} ]);
        return (
            <div className={panelClass}>
                <div className="mod-tool clearfix">
                    {this.toolbar()}
                    {this.modebar()}
                </div>
                <div className="m-content">
                    <div className={editorClass}>
                        <div className="m-editor">
                            <textarea name="content" ref="editor" onChange={this.handleChange.bind(this)}></textarea>
                        </div>
                    </div>
                    <div className={previewClass}>
                        <div className="m-preview">
                            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleChange () {
        this.setState({ content: marked(this.refs.editor.value) });
    }    
    toolbar(){
       return(
           <ul className="edit-toolbar clearfix">
             <li><a title="加粗" onClick={()=>this.boldText()}><i className="fa fa-bold"></i></a></li>
             <li><a title="斜体" onClick={()=>this.italicText()}><i className="fa fa-italic"></i></a></li>
             <li><a title="链接" onClick={()=>this.linkText()}><i className="fa fa-link"></i></a></li>
             <li><a title="引用" onClick={()=>this.quoteText()}><i className="fa fa-quote-left"></i></a></li>
             <li><a title="代码段" onClick={()=>this.codeText()}><i className="fa fa-code"></i></a></li>
             <li><a title="图片" onClick={()=>this.pictureText()}><i className="fa fa-picture-o"></i></a></li>
             <li><a title="有序列表" onClick={()=>this.list_olText()}><i className="fa fa-list-ol"></i></a></li>
             <li><a title="无序列表" onClick={()=>this.list_ulText()}><i className="fa fa-list-ul"></i></a></li>
             <li><a title="标题" onClick={()=>this.headerText()}><i className="fa fa-header"></i></a></li>
           </ul>
       )
    }
    modebar(){
        const actCheck=(_mode)=>classNames({'act': this.state.mode=== _mode});
        const actTheme=()=>classNames({'act': this.state.theme});
        const actFullScreen=()=>classNames({'act': this.state.isFullScreen});
        return(
            <ul className="preview-toolbar clearfix">
                <li>
                    <a ref="fullScreen" className={actFullScreen()} onClick={()=>this.tooggleFullScreen()}  onKeyDown={this.tooggleFullScreen.bind(this)} title="全屏模式" >
                        <i className="fa fa-arrows-alt"></i>
                    </a>
                </li>
                <li>
                    <a className={actTheme()} onClick={(_state)=>this.chageState({theme: !this.state.theme})} title="主体切换">
                        <i className="fa fa-adjust"></i>
                    </a>
                </li>
                <li>
                    <a className={actCheck("preview")} onClick={(preview)=>this.chageMode("preview")} title="阅读模式">
                        <i className="fa fa-eye"></i>
                    </a>
                </li>
                
                <li>
                    <a className={actCheck("split")} onClick={(split)=>this.chageMode("split")} title="分屏模式">
                        <i className="fa fa-columns"></i>
                    </a>
                </li>
                <li>
                    <a className={actCheck("edit")} onClick={(edit)=>this.chageMode("edit")} title="编辑模式">
                        <i className="fa fa-pencil"></i>
                    </a>
                </li>
            </ul>  
        ) 
    }
    chageMode(_mode){
        this.setState({mode: _mode});
    }
    chageState(_state){
        this.setState(_state);
    }
    tooggleFullScreen(){
        if(this.state.isFullScreen===true){
            this.setState({isFullScreen: false});
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
        else{
            this.setState({isFullScreen: true});
            let docElm = document.documentElement;
            /*W3C*/
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            /*FireFox*/
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            /*Chrome*/
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            /*IE11*/
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }
    }
    getTxt1CursorPosition(object){
        const textarea=object;
        let cursurPosition=0;
        if(textarea.selectionStart){/*非IE*/
            cursurPosition= textarea.selectionStart;
        }else{/*IE*/
            try{
                var range = document.selection.createRange();
                range.moveStart("character",-textarea.value.length);
                cursurPosition=range.text.length;
            }catch(e){
                cursurPosition = 0;
            }
        }
        return cursurPosition;/*返回当前索引*/
    }
    shortCutText(string,start,end){
        const obj=this.refs.editor;
        let origin=obj.value;
        let preStart=this.getTxt1CursorPosition(obj);
        let preEnd=origin.length;
        obj.value=preStart!=preEnd?(origin.slice(0, preStart)+string+origin.slice(preStart, preEnd)):(origin+string);
        this.setState({ content: marked(this.refs.editor.value) });
        /*选中*/
        if(string.createTextRange){/*IE浏览器*/
            let range = obj.createTextRange();
            range.moveEnd(string,preStart+end);
            range.moveStart(string, preStart+start);
            range.select();
        }else{/*非IE浏览器*/
            obj.setSelectionRange(preStart+start, preStart+end);
            obj.focus();
        }
    }
    boldText(){
        this.shortCutText("**加粗文字**", 2, 6)
    }
    italicText(){
        this.shortCutText("_斜体文字_", 1, 5)
    }
    linkText(){
        this.shortCutText("[链接文本](www.link.com)", 1, 5)
    }
    quoteText(){
        this.shortCutText("> 引用", 2, 4)
    }
    codeText(){
        this.shortCutText("```\ncode block\n```", 4, 14)
    }
    pictureText () {
        this.shortCutText("![alt](www.link.com)", 2, 5)
    }
    list_olText () {
        this.shortCutText("1. 有序列表项0\n2. 有序列表项1", 3, 9)
    }
    list_ulText () {
        this.shortCutText("- 无序列表项0\n- 无序列表项1", 2, 8)
    }
    headerText () {
        this.shortCutText("## 标题", 3, 5)
    }
}
export default Eidtor;