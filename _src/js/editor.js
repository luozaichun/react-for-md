import React from 'react';
import marked from 'md-plus';
import classNames from 'classnames';
let renderer = new marked.Renderer();
let defaultOption={
    upload_route:"/upload",
    publish_route:"/",
    width: "100%",
    height: "100%",
    modebars:[
        {
            name: "fullScreen",
            modbarIcon:"fa-arrows-alt"
        },
        {
            name: "theme",
            modbarIcon:"fa-adjust"
        },
        {
            name: "preview",
            modbarIcon:"fa-eye"
        },
        {
            name: "split",
            modbarIcon:"fa-columns"
        },
        {
            name: "edit",
            modbarIcon:"fa-pencil"
        },
        {
            name: "publish",
            modbarIcon:"fa-share-square-o"
        }
    ],
};
let defaultToolbar={
    toolbars:[
        {
            name: "bold",
            title:"加粗",
            toolbarIcon:"fa-bold"
        },
        {
            name: "italic",
            title:"斜体",
            toolbarIcon:"fa-italic"
        },
        {
            name: "link",
            title:"链接",
            toolbarIcon:"fa-link"
        },
        {
            name: "blockquote",
            title:"引用",
            toolbarIcon:"fa-quote-left"
        },
        {
            name: "code",
            title:"代码段",
            toolbarIcon:"fa-code"
        },
        {
            name: "image",
            title:"图片",
            toolbarIcon:"fa-picture-o"
        },
        {
            name: "insertorderedlist",
            title:"有序列表",
            toolbarIcon:"fa-list-ol"
        },
        {
            name: "insertunorderedlist",
            title:"无序列表",
            toolbarIcon:"fa-list-ul"
        },
        {
            name: "H1",
            title:"H1",
            toolbarText:"H1"
        },
        {
            name: "H2",
            title:"H2",
            toolbarText:"H2"
        },
        {
            name: "H3",
            title:"H3",
            toolbarText:"H3"
        },
        {
            name: "H4",
            title:"H4",
            toolbarText:"H4"
        },
        {
            name: "H5",
            title:"H5",
            toolbarText:"H5"
        },
        {
            name: "H6",
            title:"H6",
            toolbarText:"H6"
        },
    ]
};
class Eidtor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            panelClass: 'mod-panel',
            mode: 'split',
            isFullScreen: true,
            theme:false,
            dia:false,
            wheelData: -1
        };
        if(!props.options.toolbars){
            this.defaultProps=Object.assign(defaultOption,defaultToolbar,props.options);
        }else{
            this.defaultProps=Object.assign(defaultOption,props.options);
        }
    }
    componentDidMount() {
        this.pasteImg();
        this.customStyle();
    }
    render() {
        const fullScreen=classNames([ 'md-container', { 'fullscreen': this.state.isFullScreen}]);
        return (
            <div ref="container" className={fullScreen}>
                {this.editor()}
            </div>
        )
    }
    editor(){
        const panelClass=classNames([ 'mod-panel', 'clearfix',{ 'dark': this.state.theme} ]);
        const editorClass = classNames([ 'mod-editor', { 'main-mode': this.state.mode === 'edit','hidden': this.state.mode === 'preview'} ]);
        const previewClass = classNames([ 'mod-preview',{ 'hidden': this.state.mode === 'edit','main-mode': this.state.mode === 'preview'} ]);
        return (
            <div className={panelClass}>
                <div className="mod-tool clearfix">
                    {this.toolbar()}
                    {this.modebar()}
                </div>
                <div className="m-content">
                    <div className={editorClass} ref="editorBox" name="picture">
                        <div className="m-editor">
                            <textarea name="content" ref="editor" onScroll={this.monopoly.call(this,(evt)=>this.updateScroll(this.refs.editor,this.refs.markdownBody))} onChange={this.handleChange.bind(this)}></textarea>
                        </div>
                    </div>
                    <div className={previewClass} id="previewBox">
                        <div ref="previewBox" className="m-preview">
                            <div ref="markdownBody" className="markdown-body" onScroll={this.monopoly.call(this,(evt)=>this.updateScroll(this.refs.markdownBody,this.refs.editor))} dangerouslySetInnerHTML={{ __html: this.state.content }}></div>

                        </div>
                    </div>

                </div>
                {this.diabox()}
            </div>
        );
    }
    toolbar(){
        return (
            <ul className="edit-toolbar clearfix">
            {
                this.defaultProps.toolbars.map((item,index)=> {
                    let toolFn,toolText='',toolIcon='';
                    if(item.toolbarIcon) toolIcon=item.toolbarIcon;
                    if(item.toolbarText) toolText=item.toolbarText;
                    let iconClass=classNames('fa', toolIcon);
                    let toolName=item.name;
                    switch (toolName){
                        case "bold":
                            toolFn=()=>this.boldText();
                            break;
                        case "italic":
                            toolFn=()=>this.italicText();
                            break;
                        case "link":
                            toolFn=()=>this.linkText();
                            break;
                        case "blockquote":
                            toolFn=()=>this.quoteText();
                            break;
                        case "code":
                            toolFn=()=>this.codeText();
                            break;
                        case "image":
                            toolFn=(_state)=>this.chageState({dia: !this.state.dia});
                            break;
                        case "insertorderedlist":
                            toolFn=()=>this.list_olText();
                            break;
                        case "insertunorderedlist":
                            toolFn=()=>this.list_ulText();
                            break;
                        case "H1":
                            toolFn=()=>this.h1Text();
                            break;
                        case "H2":
                            toolFn=()=>this.h2Text();
                            break;
                        case "H3":
                            toolFn=()=>this.h3Text();
                            break;
                        case "H4":
                            toolFn=()=>this.h4Text();
                            break;
                        case "H5":
                            toolFn=()=>this.h5Text();
                            break;
                        case "H6":
                            toolFn=()=>this.h6Text();
                            break;
                        default:
                            break;
                    }
                    if(item.toolbarHandlers){
                        toolFn=()=>item.toolbarHandlers(this);
                    }
                    return (
                        <li key={index}>
                            <a title={item.title} ref={item.name} onClick={toolFn}>
                                <i className={iconClass}>{toolText}</i>
                            </a>
                        </li>
                    )
                })
            }
            </ul>
        );

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
                <li>
                    <a className="publish" onClick={()=>this.publish()} title="立即发布">
                        <i className="fa fa-share-square-o"></i>
                        <span>发布</span>
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
                        <form name="pic-form" className="upload-box" method="post" encType="multipart/form-data">
                            <span><i className="fa fa-cloud-upload"></i>上传本地图片</span>
                            <input ref="uploadPic" className="upload-bottom" name="picture" type="file" onChange={()=>this.inputLink()}/>
                        </form>
                    </div>
                    <div className="dia-fd">
                        <a className="cancel" href="javascript:;" onClick={(_state)=>this.chageState({dia: !this.state.dia})}>取消</a>
                        <a className="confirm" href="javascript:;" onClick={()=>this.pictureOption()}>确定</a>
                    </div>
                </div>
            </div>
        )
    }
    customStyle(){
        if(this.defaultProps.width!="100%"){
            this.setState({ isFullScreen: false});
        }
        this.refs.container.style.width=(typeof this.defaultProps.width  === "number") ? this.defaultProps.width + "px"  : this.defaultProps.width;
        this.refs.container.style.height=(typeof this.defaultProps.height  === "number") ? this.defaultProps.height + "px"  : this.defaultProps.height;
        this.refs.container.style.top=(typeof this.defaultProps.top  === "number") ? this.defaultProps.top + "px"  : this.defaultProps.top;
        this.refs.container.style.left=(typeof this.defaultProps.left  === "number") ? this.defaultProps.left + "px"  : this.defaultProps.left;
    }
    handleChange () {
        this.setState({ content: marked(this.refs.editor.value,{renderer:renderer})},prettyPrint);
    }
    chageMode(_mode){
        this.setState({mode: _mode});
    }
    chageState(_state){
        this.setState(_state);
    }
    tooggleFullScreen(){
        this.setState({ isFullScreen: !this.state.isFullScreen });
    }
    /*更新滚动位置*/
    updateScroll(src,dest){
        let scrollRange=src.scrollHeight-src.clientHeight,
        p=src.scrollTop/scrollRange;
        dest.scrollTop=p*(dest.scrollHeight-dest.clientHeight);
    }
    /*同步滚动函数节流*/
    monopoly(fn,duration){
        duration=duration || 100;
        let ret=()=>{
            if(!this.monopoly.permit){
                this.monopoly.permit=fn;
            }
            if(this.monopoly.permit === fn){
                clearTimeout(this.monopoly.permitTimer);
                this.monopoly.permitTimer=setTimeout(()=>{
                    delete this.monopoly.permit;
                },duration);
                return fn.apply(this,arguments);
            }
        };
        return ret;
    }
    /*光标索引*/
    getTxt1CursorPosition(object){
        const textarea=object;
        let cursurPosition=0;
        if(textarea.selectionStart){/*非IE*/
            cursurPosition= textarea.selectionStart;
        }else{/*IE*/
            try{
                let range = document.selection.createRange();
                range.moveStart("character",-textarea.value.length);
                cursurPosition=range.text.length;
            }catch(e){
                cursurPosition = 0;
            }
        }
        return cursurPosition;/*返回当前索引*/
    }
    /**选中
     * @param {String}      string         markdown命令
     * @param {String}      start          修改文字内容起始位置
     * @param {String}      end            修改文字内容结束位置
     */
    shortCutText(string,start,end){
        const obj=this.refs.editor;
        let origin=obj.value;
        let preStart=this.getTxt1CursorPosition(obj);
        let preEnd=origin.length;
        obj.value=preStart!=preEnd?(origin.slice(0, preStart)+string+origin.slice(preStart, preEnd)):(origin+string);
        this.setState({ content: marked(this.refs.editor.value,{renderer:renderer}) });
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
        this.shortCutText("```\ncode block\n```", 4, 14);
    }
    list_olText () {
        this.shortCutText("1. 有序列表项0\n2. 有序列表项1", 3, 9)
    }
    list_ulText () {
        this.shortCutText("- 无序列表项0\n- 无序列表项1", 2, 8)
    }
    h1Text () {
        this.shortCutText("# 标题", 2, 4)
    }
    h2Text () {
        this.shortCutText("## 标题", 3, 5)
    }
    h3Text () {
        this.shortCutText("### 标题", 4, 6)
    }
    h4Text () {
        this.shortCutText("#### 标题", 5, 7)
    }
    h5Text () {
        this.shortCutText("##### 标题", 6, 8)
    }
    h6Text () {
        this.shortCutText("###### 标题", 7, 9)
    }
    /*input输入*/
    inputLink(){
        let file=this.refs.uploadPic.value;
        let filename=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");
        let FileExt=file.replace(/.+\./,"");
        this.refs.picLink.value=filename+'.'+FileExt;
    }
    /*上传图片*/
    pictureOption () {
        let val=this.refs.picLink.value;
        let _link;
        let regex =/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i;
        if(!regex.test(val)){
            this.formData("inputfile",this.refs.uploadPic.files[0],0)
        }else{
            _link=val;
            this.shortCutText("![alt]("+_link+")", 2, 5);
        }
        this.refs.picLink.value="";
        this.chageState({dia: !this.state.dia});
    }
    /*粘贴上传图片*/
    pasteImg() {
        let _this=this;
        this.refs.editorBox.addEventListener('paste', function(e) {
            let clipboardData = event.clipboardData,
                i = 0, items, item, types;
            if (clipboardData) {
                items = clipboardData.items;
                if (!items)
                    return;
                item = items[0];
                /*保存在剪贴板中的数据类型*/
                types = clipboardData.types || [];
                for (; i < types.length; i++) {
                    if (types[i] === 'Files') {
                        item = items[i];
                        break;
                    }
                }
                /*判断是否为图片数据*/
                if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                    _this.formData('file',item.getAsFile(),0)
                }
            }
        })
    }
    formData(name,e,type){/*0:上传图片，1:发布*/
        let _link,oData;
        oData = new FormData();
        oData.append(name, e);
        let oReq = new XMLHttpRequest();
        if(type==0){
            oReq.open("POST", this.defaultProps.upload_route, true);
        }else{
            oReq.open("POST", this.defaultProps.publish_route, true);
        }
        oReq.send(oData);
        oReq.onreadystatechange = () => {//在这里指定上传成功的回调函数，接受返回值
            if (oReq.readyState == 4 && oReq.status == 200) {
                if(type==0){
                    let res = JSON.parse(oReq.responseText);
                    _link=res.fileUrl;
                    this.shortCutText("![alt]("+_link+")", 2, 5);
                }else{
                    if(JSON.parse(oReq.responseText).code==1){
                        this.chageMode("preview");
                    }
                }
            }
        }; /*指定回调函数*/
    }
    /*发布*/
    publish(){
        let _html='<div class="markdown-body">'+this.state.content+'</div>';
        this.formData("publishData",_html,1)
    }
}

export default Eidtor;