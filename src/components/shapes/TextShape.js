import React from 'react';
import Shape from './Shape';
class TextShape extends Shape {
	constructor(props) {
		super(props);
		this.__type__= TextShape.name;
		this.define("text","string","文本",function(value){
			return true;
		},"请修改内容");
		
		this.define("fontSize","number","字体大小",function(value){
			return value>0;
		},16);
		
		this.define("color","string","字体颜色",function(value){
			return true;
		},"#000000");
	}
	shapeRender(propertys) {
		return(<div>{propertys.text}</div>);
	}
}
export default TextShape;