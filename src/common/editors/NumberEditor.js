import React from 'react';
import Editor from './Editor';
import { InputNumber } from 'antd';
class NumberEditor extends Editor
{
	render(){
		return (<InputNumber defaultValue={this.props.value||0} onChange={(value)=>{this.handleChange(value)}}/>);
	}
}
export default NumberEditor;