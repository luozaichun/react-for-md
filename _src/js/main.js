import React from 'react';
import Editor from './editor';

class Main extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="container">
                <Editor />
            </div>
        )    
    }
}
export default Main;