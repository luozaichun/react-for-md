import React from 'react';
import marked from 'marked';
import style from '../css/style.css';
class Eidtor extends React.Component {
    static propTypes = { // as static property
        content: React.PropTypes.string.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            panelClass: 'md-panel',
            mode: 'split',
            isFullScreen: false,
            content: marked(this.props.content || '')
        }
    }
    render() {
        return (
            <div className="h">
                Hello 
            </div>
        );
    }
}
export default Eidtor;