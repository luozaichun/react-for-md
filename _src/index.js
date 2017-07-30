import React from 'react';
import ReactDOM from 'react-dom';
import Main from './js/main';
import './css/style.css';
import './css/prettyprint.css';
window.Editor=function(id,options){
    ReactDOM.render(
        <Main options={options}/>,
        document.getElementById(id)
    );
};