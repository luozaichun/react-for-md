import React from 'react';
import marked from 'marked';
import style from '../css/style.css';
import classNames from 'classnames';
class Eidtor extends React.Component {
    // static propTypes = {
    //     // content: React.PropTypes.string.isRequired
    // };
    constructor(props){
        super(props);
        this.state = {
            panelClass: 'mod-panel',
            mode: 'split',
            isFullScreen: false,
            theme:'light',
            value: marked('')
        }
    }
    render() {
        const panelClass=classNames([ 'mod-panel', 'clearfix',{ 'fullscreen': this.state.isFullScreen },{ 'dark': this.state.mode === 'dark'} ]);
        const editorClass = classNames([ 'mod-editor', { 'main-mode': this.state.mode === 'edit' } ]);
        const previewClass = classNames([ 'mod-preview', { 'hidden': this.state.mode === 'edit','main-mode': this.state.mode === 'preview'} ]);
        let value = this.state.value;
        return (
            <div className={panelClass}>
                <div className="mod-tool">
                    <ul className="edit-toolbar">
                        
                    </ul>
                    <ul className="preview-toolbar">

                    </ul>
                </div>
                <div className={editorClass}>
                    <textarea name="content" value={value} onChange={this.handleChange.bind(this)}></textarea>
                </div>
                <div className={previewClass} dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
            </div>
        );
    }
    handleChange (event) {
        this.setState({
            value: event.target.value
        });
        // setTimeout(() => {
        //     this.setState({ content: marked(e.target.value) });
        // }, 300)
    }
}
export default Eidtor;