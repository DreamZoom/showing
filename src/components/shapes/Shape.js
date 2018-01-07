import React from 'react';
import StyleParser from './StyleParser';
import AnimationParser from './AnimationParser';
class Shape
{
	constructor(){
		this.schemas=[];
		this.propertys={};
        this.define('x',"number","横坐标",null,0);
        this.define('y',"number","纵坐标",null,0);
        this.define('width',"number","宽度",null,100);
        this.define('height',"number","高度",null,100);
        this.define('rotate',"number","旋转角度",null,0);
        this.define('borderWidth',"number","边框",null,1);
        this.define('borderColor',"string","边框颜色",null,"#ddd");
        this.define('animations',"animations","动画",null,[]);
        this.__type__= Shape.name;
        console.log(this);
	}

	define(name,type,label,rule,value){
		this.schemas.push({name:name,type:type,label:label,rule:rule,value:value});
		this[name]=value;
	}
	
	
	load(propertys){
		for(var p in propertys){
			if(p==="schemas"||p==="propertys"||p==="__type__") continue;
			this[p]=propertys[p];
		}
	}

	
	render(key,selected){
		let propertys = Object.assign({}, this);		
		var style=StyleParser.parse(propertys);
		let animations = AnimationParser.parse(propertys.animations);
		return(<div key={key} className={"animation shape "+(selected?"selected":"")} style={style} data-animations={animations}>{this.shapeRender(propertys)}</div>);
	}
	
	shapeRender(props){
		
	}

	
	isHit(point){
		return (point.x>=this.x && point.x<=(this.x+this.width)) && (point.y>=this.y && point.y<=(this.y+this.height));
	}
	
	
	getAnchorPoints(offsetX,offsetY){
		offsetX=offsetX||0;
		offsetY=offsetY||0;
		var points=[];
		points.push({x:this.x+offsetX,y:this.y+offsetY});
		points.push({x:this.x+offsetX+this.width/2,y:this.y+offsetY+this.height/2});
		points.push({x:this.x+offsetX+this.width,y:this.y+offsetY+this.height});
		return points;
	}
}
export default Shape;