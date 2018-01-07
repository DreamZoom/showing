import React from 'react';
import Shape from './Shape';
class ImageShape extends Shape {
	constructor(props) {
		super(props);
		this.__type__= ImageShape.name;
		this.define("src","string","图片地址",function(value){
			return true;
		},"/src/images/default.png");
		this.width=200;
		this.height=200;
		
	}
	shapeRender(propertys) {
		return(<img src={propertys.src} />);
	}
}
export default ImageShape;