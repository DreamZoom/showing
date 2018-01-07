import React from 'react';
import ReactDOM from 'react-dom';
class Editor extends React.Component
{
	constructor(props) {  
        super(props);  
        this.schema = props.schema;
    }  
    
    handleChange(value){
    	if(this.props.onChange){
    		this.props.onChange(value);
    	}
    }
}
export default Editor;