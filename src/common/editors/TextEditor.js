import React from 'react';
import Editor from './Editor';
import { Input } from 'antd';
class TextEditor extends Editor
{
	render(){
		return (<Input defaultValue={this.props.value||""} onChange={(e)=>{this.handleChange(e.target.value)}}/>);
	}
}
export default TextEditor;