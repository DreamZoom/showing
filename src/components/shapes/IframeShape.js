import React from 'react';
import Shape from './Shape';
class IframeShape extends Shape {
	constructor(props) {
		super(props)
		this.__type__= IframeShape.name;
		this.define("src","string","页面地址",function(value){
			return true;
		},"http://www.baidu.com");
		this.width=200;
		this.height=200;
		
	}
	shapeRender(propertys) {
		return(<iframe src={propertys.src} />);
	}
}
export default IframeShape;