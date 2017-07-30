import React from 'react';
import Editor from './editor';

class Main extends React.Component{
    constructor(props){
        super(props);
        console.log(11);
        console.log(props.options);
        console.log(22);

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