import React from 'react';

class Scroll extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            wheelData: -1,
        }

    }
    componentDidMount() {
        this.scrollBar(this.props.scrollParent,this.props.scrollContent);
    }
    render() {
        return (
            <div className="mod-scroll">
                <div ref="scrollBox" className="m-scroll">
                    <span></span>
                </div>
            </div>
        )
    }
    /*滚动条*/
    scrollBar(mainBox, contentBox){
        let scrollDiv = this.refs.scrollBox;
        this._resizeScorll(scrollDiv, mainBox, contentBox);
        this._tragScroll(scrollDiv, mainBox, contentBox);
        this._wheelChange(scrollDiv, mainBox, contentBox);
        this._clickScroll(scrollDiv, mainBox, contentBox);
    }
    _bind(obj, type, handler) {
        let node = typeof obj == "string" ? $(obj) : obj;
        if (node.addEventListener) {
            node.addEventListener(type, handler, false);
        } else if (node.attachEvent) {
            node.attachEvent('on' + type, handler);
        } else {
            node['on' + type] = handler;
        }
    }
    _mouseWheel(obj,handler) {
        let node = typeof obj == "string" ? $(obj) : obj;
        this._bind(node, 'mousewheel', function (event) {
            let data = -this._getWheelData(event);
            handler(data);
            if (document.all) {
                window.event.returnValue = false;
            } else {
                event.preventDefault();
            }
        });
        //火狐
        this._bind(node, 'DOMMouseScroll', function (event) {
            let data = this._getWheelData(event);
            handler(data);
            event.preventDefault();
        });
    }
    _getWheelData(event){
        let e = event || window.event;
        return e.wheelDelta ? e.wheelDelta : e.detail * 40;
    }
    //调整滚动条
    _resizeScorll(element, mainBox, contentBox) {
        let p = element.parentNode;
        let conHeight=0;
        if(contentBox&&contentBox.offsetHeight){
            conHeight=contentBox.offsetHeight;
        }
        let _width = mainBox.clientWidth;
        let _height = mainBox.clientHeight;
        let _scrollWidth = element.offsetWidth;
        let _left = _width - _scrollWidth;
        p.style.width = _scrollWidth + "px";
        p.style.height = _height + "px";
        p.style.left = _left + "px";
        p.style.position = "absolute";
        p.style.background = "#ccc";
        contentBox.style.width = (mainBox.offsetWidth - _scrollWidth) + "px";
        let _scrollHeight = parseInt(_height * (_height / conHeight));
        if (_scrollHeight >= mainBox.clientHeight) {
            element.parentNode.style.display = "none";
        }
        element.style.height = _scrollHeight + "px";
    }
    //拖动滚动条
    _tragScroll(element, mainBox, contentBox) {
        let _this=this;
        let mainHeight = mainBox.clientHeight;
        element.onmousedown = (event) => {
            let _scrollTop = element.offsetTop;
            let e = event || window.event;
            let top = e.clientY;
            document.onmousemove = (event) => {
                let e = event || window.event;
                let _top = e.clientY;
                let _t = _top - top + _scrollTop;
                if (_t > (mainHeight - element.offsetHeight)) {
                    _t = mainHeight - element.offsetHeight;
                }
                if (_t <= 0) {
                    _t = 0;
                }
                element.style.top = _t + "px";
                contentBox.style.top = -_t * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
                _this.setState({ wheelData: _t });
            };
            document.onmouseup = (event) => {
                _this.onmousemove = null;
            }
        };
        element.onmouseover = function () {
            this.style.background = "#444";
        };
        element.onmouseout = function () {
            this.style.background = "#666";
        }
    }
    //鼠标滚轮滚动，滚动条滚动
    _wheelChange(element, mainBox, contentBox) {
        let _this=this;
        let node = typeof mainBox == "string" ? $(mainBox) : mainBox;
        let flag = 0, rate = 0, wheelFlag = 0;
        if (node) {
            this._mouseWheel(node, function (data) {
                wheelFlag += data;
                if (_this.state.wheelData >= 0) {
                    flag = _this.state.wheelData;
                    element.style.top = flag + "px";
                    wheelFlag = _this.state.wheelData * 12;
                    _this.setState({ wheelData: -1 });
                } else {
                    flag = wheelFlag / 12;
                }
                if (flag <= 0) {
                    flag = 0;
                    wheelFlag = 0;
                }
                if (flag >= (mainBox.offsetHeight - element.offsetHeight)) {
                    flag = (mainBox.clientHeight - element.offsetHeight);
                    wheelFlag = (mainBox.clientHeight - element.offsetHeight) * 12;
                }
                element.style.top = flag + "px";
                contentBox.style.top = -flag * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
            });
        }
    }

    _clickScroll(element, mainBox, contentBox) {
        let p = element.parentNode;
        let _this=this;
        p.onclick = function (event) {
            let e = event || window.event;
            let t = e.target || e.srcElement;
            let sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
            let top = mainBox.offsetTop;
            let _top = e.clientY + sTop - top - element.offsetHeight / 2;
            if (_top <= 0) {
                _top = 0;
            }
            if (_top >= (mainBox.clientHeight - element.offsetHeight)) {
                _top = mainBox.clientHeight - element.offsetHeight;
            }
            if (t != element) {
                element.style.top = _top + "px";
                contentBox.style.top = -_top * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
                _this.setState({ wheelData: _top });
            }
        }
    }
}
export default Scroll;