import React from 'react';
import Shape from './shapes/Shape';
import TextShape from './shapes/TextShape';
import ImageShape from './shapes/ImageShape';
import IframeShape from './shapes/IframeShape';
import ShapeParser from './ShapeParser';
class Graph {
	constructor(title) {
		this.shapes = [];
		this.selected = -1;
		this.title=title||"";
		this.__type__= Graph.name;
	}
	
	load(graph){
		this.title=graph.title||this.title||"";
		if(graph.shapes){
			for (var i=0;i<graph.shapes.length;i++) {
				var shape = ShapeParser.parse(graph.shapes[i]);
				this.shapes.push(shape);
			}
		}
		
	}

	newTextShape() {
		var shape = new TextShape();
		this.shapes.push(shape);
		return shape;
	}
	
	newImageShape() {
		var shape = new ImageShape();
		this.shapes.push(shape);
		return shape;
	}
	
	newIframeShape() {
		var shape = new IframeShape();
		this.shapes.push(shape);
		return shape;
	}
	
	getSelectShape(){
		if(this.selected>=0){
			return this.shapes[this.selected];
		}
		return null;
	}

	hit(point) {
		this.selected=-1;
		for(var i = 0; i < this.shapes.length; i++) {
			var shape = this.shapes[i];
			if(shape.isHit(point)) {				
				this.selected=i;
			}
		}
	}

	render() {
		var context = this;
		return this.shapes.map(function(shape, i) {
			return shape.render(i,(context.selected==i));
		})
	}
	
	getAnchorPoints(width,height){
		var context = this;
		var points =[]; 
		this.shapes.map(function(shape,i){
			if(i==context.selected) return;
			points=points.concat(shape.getAnchorPoints());
		});
		points.push({x:0,y:0});
		points.push({x:width/2,y:height/2});
		points.push({x:width,y:height});
		return points;
	}
}
export default Graph;