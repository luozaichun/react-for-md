import React from 'react';
import style from '../css/style.css';
import marked from 'marked';

const Eidtor = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired
    },
    getInitialState () {
        return {
            panelClass: 'md-panel',
            mode: 'split',
            isFullScreen: false,
            result: marked(this.props.content || '')
        }
    },
    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    },

    render: function () {
        return (
            <div className="h">
                Hello XXX
            </div>
        );
    }
});
export default Eidtor;