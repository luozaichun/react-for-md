import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './js/editor';
import './css/style.css';
import './css/prettyprint.css';
window.Editor=function(id,options){
    ReactDOM.render(
        <Editor options={options}/>,
        document.getElementById(id)
    );
};