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
            theme:false,
            dia:false
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
                {this.diabox()}
            </div>
        );
    }
    toolbar(){
       return(
           <ul className="edit-toolbar clearfix">
             <li><a title="加粗" onClick={()=>this.boldText()}><i className="fa fa-bold"></i></a></li>
             <li><a title="斜体" onClick={()=>this.italicText()}><i className="fa fa-italic"></i></a></li>
             <li><a title="链接" onClick={()=>this.linkText()}><i className="fa fa-link"></i></a></li>
             <li><a title="引用" onClick={()=>this.quoteText()}><i className="fa fa-quote-left"></i></a></li>
             <li><a title="代码段" onClick={()=>this.codeText()}><i className="fa fa-code"></i></a></li>
             <li><a title="图片"  onClick={(_state)=>this.chageState({dia: !this.state.dia})}><i className="fa fa-picture-o"></i></a></li>
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
    diabox(){
        const appearClass=classNames([ 'mod-dia', { 'appear': this.state.dia }]);
        const diaClass=classNames([ 'm-dia', { 'theme-black': this.state.theme }]);
        return(
            <div className={appearClass}>
                <span className="mask" onClick={(_state)=>this.chageState({dia: !this.state.dia})}></span>
                <div className={diaClass}>
                    <div className="dia-hd">
                        <a className="close" href="javascript:;" onClick={(_state)=>this.chageState({dia: !this.state.dia})}>
                            <i className="fa fa-close"></i>
                        </a>
                        <h3>图片</h3>
                    </div>
                    <div className="dia-bd">
                        <p>请输入图片或附件地址</p>
                        <i className="icon-picture fa fa-picture-o"></i>
                        <input className="pic-link" ref="picLink" type="text" placeholder="http://example.com/images/diagram.jpg"/>
                        <form className="upload-box" method="post" action="/add" encType="multipart/form-data">
                            <span><i className="fa fa-cloud-upload"></i>上传本地图片</span>
                            <input className="upload-bottom" name="upload_pic" type="file"/>
                        </form>
                    </div>
                    <div className="dia-fd">
                        <a className="cancel" href="javascript:;" onClick={(_state)=>this.chageState({dia: !this.state.dia})}>取消</a>
                        <a className="confirm" href="javascript:;" onClick={()=>this.pictureText()}>确定</a>
                    </div>
                </div>
            </div>
        )
    }
    handleChange () {
        this.setState({ content: marked(this.refs.editor.value) });
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
        let _link=this.refs.picLink.value;
        this.shortCutText("![alt]("+_link+")", 2, 5);
        this.refs.picLink.value="";
        this.chageState({dia: !this.state.dia});
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